"use client";

import { useEffect } from "react";

import { useState } from "react";

import { getMessages } from "@/app/actions";

import Link from "next/link";

export default function ChatFeed({ roomId }: { roomId: string | null }) {
  const [messages, setMessages] = useState<
    { id: string; content: string; createdAt: Date; parentId: string | null }[]
  >([]);

  useEffect(() => {
    getMessages(roomId).then((messages) => {
      setMessages(messages);
    });
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="p-2 bg-neutral-800 rounded">
          <p>{message.content}</p>
          <small className="text-neutral-400">
            {new Date(message.createdAt).toLocaleString()}
          </small>
          <Link
            href={`/chat/${message.id}`}
            className="text-neutral-400 hover:text-neutral-200 text-sm mt-1 block"
          >
            Reply
          </Link>
        </div>
      ))}
    </div>
  );
}
