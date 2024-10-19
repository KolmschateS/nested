import ChatRoom from '@/components/ChatRoom';

export default function NestedChat({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto flex-grow flex flex-col">
      <ChatRoom roomId={params.id} />
    </div>
  );
}