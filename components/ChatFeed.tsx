// components/ChatFeed.tsx
"use client";

import ChatBubble from "@/components/ChatBubble";

interface ChatFeedProps {
  messages: { id: string; content: string; createdAt: string; parentId: string | null }[];
}

export default function ChatFeed({ messages }: ChatFeedProps) {
  return (
    <div>
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
