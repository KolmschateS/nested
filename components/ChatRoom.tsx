// ChatRoom.tsx
"use client";

import { useEffect, useState } from "react";
import ChatFeed from "@/components/ChatFeed";
import ChatBox from "@/components/ChatBox";
import { getMessages } from "@/app/actions";

export default function ChatRoom({ roomId }: { roomId: string }) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ id: string; content: string; createdAt: string; parentId: string | null }[]>([]);

  useEffect(() => {
    // Fetch initial messages for the room
    getMessages(roomId).then((fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    // Set up WebSocket connection
    const websocket = new WebSocket("ws://localhost:3001");

    websocket.onopen = () => {
      console.log("WebSocket connection opened");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === 'newMessage') {
        setMessages((prev) => [...prev, messageData.message]);
      }
    };

    websocket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    websocket.onclose = (event) => {
      console.log("WebSocket connection closed", event);
      setWs(null);
    };

    return () => {
      websocket.close();
    };
  }, [roomId]);

  const sendMessage = (content: string) => {
    if (ws) {
      const message = JSON.stringify({ type: "newMessage", content, parentId: roomId });
      ws.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200">
      <ChatFeed messages={messages} />
      <ChatBox sendMessage={sendMessage} />
    </div>
  );
}
