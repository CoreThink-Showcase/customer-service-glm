export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  customerEmail?: string;
  customerName?: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentTicketId: string | null;
}
