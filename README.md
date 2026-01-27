# AI Customer Support Agent

## Prompt

### "I want to build an AI customer support agent that answers common questions for an e-commerce store. Can you create a React + TypeScript frontend with a chat interface and basic ticket tracking?"

<img width="1440" height="755" alt="image" src="https://github.com/user-attachments/assets/59b2ecea-2f3b-47bf-8590-9591eda09ec4" />


A React + TypeScript customer support chat interface with AI-powered responses and ticket tracking for e-commerce stores.

## Features

- **AI-Powered Chat**: Intelligent responses to common customer questions about shipping, returns, refunds, payments, orders, and more
- **Ticket Tracking**: Automatic ticket creation from conversations with status management (Open, In Progress, Resolved, Closed)
- **Priority Management**: Set ticket priorities (Low, Medium, High, Urgent)
- **Message History**: View complete conversation history for each ticket
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Real-time Updates**: Instant AI responses with typing indicators

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx    # Main chat container
│   ├── ChatMessage.tsx      # Individual message component
│   ├── ChatInput.tsx        # Message input field
│   ├── TicketList.tsx       # Sidebar ticket list
│   └── TicketDetail.tsx     # Ticket detail view
├── hooks/
│   └── useAIResponse.ts      # AI response logic
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## How It Works

1. **Chat Interface**: Users can type questions in the chat interface
2. **AI Response**: The system analyzes the message and provides relevant responses from a knowledge base
3. **Ticket Creation**: The first message automatically creates a support ticket
4. **Ticket Management**: View all tickets, update status and priority, and view message history
5. **Conversation Tracking**: All messages are stored within their respective tickets

## Supported Topics

The AI can help with:
- Shipping information and delivery times
- Return and refund policies
- Payment methods
- Order tracking
- Order cancellation
- Contact information
- Size guides
- Stock availability
- Discounts and promotions

## Customization

### Adding New AI Responses

Edit `src/hooks/useAIResponse.ts` to add new responses to the `KNOWLEDGE_BASE` object:

```typescript
const KNOWLEDGE_BASE: Record<string, string> = {
  'your-keyword': 'Your response here...',
  // ... existing entries
};
```

### Styling

The application uses Tailwind CSS. Customize the design by modifying the Tailwind classes in the component files or update `tailwind.config.js` for global theme changes.

## Future Enhancements

- Integration with real AI APIs (OpenAI, Anthropic, etc.)
- Backend API for persistent ticket storage
- User authentication
- File attachment support
- Email notifications
- Agent handoff to human support
- Analytics dashboard
- Multi-language support

## License

MIT
