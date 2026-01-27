import { Ticket, TicketStatus, TicketPriority } from '../types';
import { Calendar, Mail, User as UserIcon, ArrowLeft } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdateStatus: (status: TicketStatus) => void;
  onUpdatePriority: (priority: TicketPriority) => void;
}

export const TicketDetail = ({ ticket, onClose, onUpdateStatus, onUpdatePriority }: TicketDetailProps) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{ticket.subject}</h2>
        <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Created</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          
          {ticket.customerEmail && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Customer Email</p>
                <p className="text-sm font-medium text-gray-800">{ticket.customerEmail}</p>
              </div>
            </div>
          )}
          
          {ticket.customerName && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <UserIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Customer Name</p>
                <p className="text-sm font-medium text-gray-800">{ticket.customerName}</p>
              </div>
            </div>
          )}
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Status</p>
            <select
              value={ticket.status}
              onChange={(e) => onUpdateStatus(e.target.value as TicketStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Priority</p>
            <select
              value={ticket.priority}
              onChange={(e) => onUpdatePriority(e.target.value as TicketPriority)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Messages ({ticket.messages.length})</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-2 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-100 ml-4' 
                      : 'bg-green-100 mr-4'
                  }`}
                >
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    {message.role === 'user' ? 'You' : 'Support Agent'}
                  </p>
                  <p className="text-sm text-gray-800">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
