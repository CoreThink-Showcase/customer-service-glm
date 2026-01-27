import { Ticket, TicketStatus } from '../types';
import { Clock, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (ticketId: string) => void;
}

const statusConfig: Record<TicketStatus, { label: string; icon: any; color: string }> = {
  'open': { label: 'Open', icon: AlertCircle, color: 'text-blue-500' },
  'in-progress': { label: 'In Progress', icon: Loader2, color: 'text-yellow-500' },
  'resolved': { label: 'Resolved', icon: CheckCircle, color: 'text-green-500' },
  'closed': { label: 'Closed', icon: XCircle, color: 'text-gray-500' },
};

export const TicketList = ({ tickets, selectedTicketId, onSelectTicket }: TicketListProps) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Support Tickets</h2>
        <p className="text-sm text-gray-500 mt-1">{tickets.length} total tickets</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <Clock className="w-12 h-12 mb-2" />
            <p className="text-sm text-center">No tickets yet. Start a chat to create one!</p>
          </div>
        ) : (
          tickets.map((ticket) => {
            const StatusIcon = statusConfig[ticket.status].icon;
            return (
              <button
                key={ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
                className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedTicketId === ticket.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500 truncate mt-1">{ticket.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <StatusIcon className={`w-4 h-4 ${statusConfig[ticket.status].color}`} />
                      <span className="text-xs text-gray-500">{statusConfig[ticket.status].label}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ticket.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
