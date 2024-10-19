// components/ChatFeed.tsx
"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "@/components/ChatBubble";

interface ChatFeedProps {
  messages: { id: string; content: string; createdAt: string; parentId: string | null }[];
  mainMessage: { id: string; content: string; createdAt: string; parentId: string | null } | null;
}

export default function ChatFeed({ messages, mainMessage }: ChatFeedProps) {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Scroll naar het einde van de berichten wanneer de berichtenlijst verandert
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-4">
      {/* Hoofdbericht tonen, bovenaan */}
      {mainMessage && (
        <div className="mb-4 p-4 bg-neutral-800 rounded">
          <h2 className="text-lg font-bold mb-2">Hoofdbericht:</h2>
          <ChatBubble message={mainMessage} />
        </div>
      )}

      {/* Lijst met berichten */}
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Onzichtbare div om te scrollen naar het laatste bericht */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
