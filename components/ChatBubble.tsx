// components/ChatBubble.tsx
import Link from 'next/link';

interface ChatBubbleProps {
  message: { id: string; content: string; createdAt: string; parentId: string | null };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <Link 
      href={`/chat/${message.id}`} 
      className="block p-2 m-2 bg-neutral-800 rounded hover:bg-neutral-700 transition"
    >
      <p>{message.content}</p>
      <small className="text-neutral-400">
        {new Date(message.createdAt).toLocaleString()}
      </small>
    </Link>
  );
};

export default ChatBubble;
