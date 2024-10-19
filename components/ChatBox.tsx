// components/ChatBox.tsx
"use client";

import { useState } from "react";

interface ChatBoxProps {
  sendMessage: (content: string) => void;
}

export default function ChatBox({ sendMessage }: ChatBoxProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(newMessage); // Call the sendMessage function from props
    setNewMessage(''); // Clear the input
  };

  return (
    <form onSubmit={handleSendMessage} className="fixed bottom-0 left-0 right-0 p-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow py-2 px-4 border border-neutral-700 rounded-l bg-neutral-900 text-neutral-200 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-neutral-700 text-neutral-200 py-2 px-4 rounded-r hover:bg-neutral-600 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
}
