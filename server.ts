import { Server } from "bun";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ChatMessage {
  type: 'newMessage' | 'fetchMessages';
  content?: string;
  parentId?: string | null;
}

const server = Bun.serve<{ authToken: string }>({
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      return undefined;
    }
    return new Response("HTTP response");
  },
  websocket: {
    async message(ws, message) {
      const data = JSON.parse(message as string) as ChatMessage;

      switch (data.type) {
        case 'newMessage':
          if (data.content) {
            let parentMessage = null;
            if (data.parentId) {
              parentMessage = await prisma.message.findUnique({
                where: { id: data.parentId }
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
      ws.subscribe('chatroom');
    },
  },
  port: 3001,
});

console.log(`WebSocket server listening on ${server.hostname}:${server.port}`);