// server.ts
import { Server } from "bun";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ChatMessage {
  type: 'newMessage' | 'fetchMessages';
  content?: string;
  parentId?: string | null;
}

const server = Bun.serve({
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      return undefined; // If successful upgrade, return undefined to indicate no further response.
    }
    return new Response("HTTP response"); // Default response for non-WebSocket requests.
  },
  websocket: {
    async message(ws, message) {
      const data: ChatMessage = JSON.parse(message as string);

      switch (data.type) {
        case 'newMessage':
          if (data.content) {
            let parentMessage = null;
            if (data.parentId) {
              parentMessage = await prisma.message.findUnique({
                where: { id: data.parentId },
              });
              if (!parentMessage) {
                ws.send(JSON.stringify({ type: 'error', message: 'Parent message not found' }));
                return;
              }
            }
            const newMessage = await prisma.message.create({
              data: {
                content: data.content,
                parentId: parentMessage ? parentMessage.id : null,
              },
            });
            // Publish the new message to all subscribed clients.
            server.publish('chatroom', JSON.stringify({ type: 'newMessage', message: newMessage }));
          }
          break;
        case 'fetchMessages':
          const messages = await prisma.message.findMany({
            where: { parentId: data.parentId || null },
            orderBy: { createdAt: 'asc' },
          });
          ws.send(JSON.stringify({ type: 'messages', messages }));
          break;
      }
    },
    open(ws) {
      console.log('WebSocket connection opened');
      ws.subscribe('chatroom'); // Subscribe the client to the chatroom.
    },
    close(ws) {
      console.log('WebSocket connection closed');
    },
    error(ws, error) {
      console.error('WebSocket error:', error);
    },
  },
  port: 3001, // Define the port on which the server listens.
});

console.log(`WebSocket server listening on ws://localhost:${server.port}`);
