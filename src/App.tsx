import { useState, useCallback } from 'react';
import { Message, Ticket, TicketStatus, TicketPriority } from './types';
import { ChatInterface } from './components/ChatInterface';
import { TicketList } from './components/TicketList';
import { TicketDetail } from './components/TicketDetail';
import { useAIResponse } from './hooks/useAIResponse';
import { MessageSquare } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);
  const [showTickets, setShowTickets] = useState(false);
  const { isTyping, getAIResponse } = useAIResponse();

  const createTicket = useCallback((subject: string, description: string) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      subject,
      description,
      status: 'open',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket.id;
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Create a ticket if this is the first message and no ticket exists
    if (!currentTicketId) {
      const ticketId = createTicket(
        content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        content
      );
      setCurrentTicketId(ticketId);
    }

    // Get AI response
    const aiMessage = await getAIResponse(content);
    setMessages((prev) => [...prev, aiMessage]);

    // Update ticket with messages
    if (currentTicketId) {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === currentTicketId
            ? {
                ...ticket,
                messages: [...ticket.messages, userMessage, aiMessage],
                updatedAt: new Date(),
              }
            : ticket
        )
      );
    }
  }, [currentTicketId, createTicket, getAIResponse]);

  const handleSelectTicket = useCallback((ticketId: string) => {
    setSelectedTicketId(ticketId);
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      setMessages(ticket.messages);
      setCurrentTicketId(ticketId);
    }
  }, [tickets]);

  const handleCloseTicketDetail = useCallback(() => {
    setSelectedTicketId(null);
  }, []);

  const handleUpdateTicketStatus = useCallback((ticketId: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status, updatedAt: new Date() }
          : ticket
      )
    );
  }, []);

  const handleUpdateTicketPriority = useCallback((ticketId: string, priority: TicketPriority) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, priority, updatedAt: new Date() }
          : ticket
      )
    );
  }, []);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Customer Support</h1>
              <p className="text-sm text-gray-500">E-commerce Support Agent</p>
            </div>
          </div>
          <button
            onClick={() => setShowTickets(!showTickets)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            {showTickets ? 'Hide Tickets' : 'View Tickets'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Ticket List Sidebar */}
        {showTickets && (
          <div className="w-96 flex-shrink-0">
            <TicketList
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={handleSelectTicket}
            />
          </div>
        )}

        {/* Chat Interface or Ticket Detail */}
        <div className="flex-1 flex">
          {selectedTicket ? (
            <div className="w-full">
              <TicketDetail
                ticket={selectedTicket}
                onClose={handleCloseTicketDetail}
                onUpdateStatus={(status) => handleUpdateTicketStatus(selectedTicket.id, status)}
                onUpdatePriority={(priority) => handleUpdateTicketPriority(selectedTicket.id, priority)}
              />
            </div>
          ) : (
            <div className="w-full">
              <ChatInterface
                messages={messages}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
