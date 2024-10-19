"use client";

import { useEffect, useState } from "react";
import ChatFeed from "@/components/ChatFeed";
import ChatBox from "@/components/ChatBox";
import { getMessages, getMainMessage } from "@/app/actions";

export default function ChatRoom({ roomId }: { roomId: string }) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ id: string; content: string; createdAt: string; parentId: string | null }[]>([]);
  const [mainMessage, setMainMessage] = useState<{ id: string; content: string; createdAt: string; parentId: string | null } | null>(null);

  useEffect(() => {
    // Haal het hoofdbericht op (het bericht waarop je hebt geklikt)
    getMainMessage(roomId).then((message) => {
      setMainMessage(message);
    });

    // Haal de replies op
    getMessages(roomId).then((messages) => {
      setMessages(messages);
    });

    // WebSocket connectie opzetten
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
      {/* Geef het hoofdbericht en de berichten door aan ChatFeed */}
      <ChatFeed messages={messages} mainMessage={mainMessage} />
      <ChatBox sendMessage={sendMessage} />
    </div>
  );
}
