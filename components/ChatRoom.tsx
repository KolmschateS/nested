import ChatBox from "@/components/ChatBox";
import ChatFeed from "@/components/ChatFeed";

export default function ChatRoom({ roomId }: { roomId: string | null }) {

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200">
      <ChatFeed roomId={roomId} />
      <ChatBox roomId={roomId} />
    </div>
  );
}