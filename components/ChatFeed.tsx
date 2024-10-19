// components/ChatFeed.tsx
"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "@/components/ChatBubble";

interface ChatFeedProps {
  messages: { id: string; content: string; createdAt: string; parentId: string | null }[];
}

export default function ChatFeed({ messages }: ChatFeedProps) {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Scroll naar beneden wanneer de berichten veranderen
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {/* Een div om naar te scrollen */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
