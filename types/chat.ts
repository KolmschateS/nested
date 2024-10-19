import { Message as PrismaMessage } from '@prisma/client';

export type Message = Omit<PrismaMessage, 'id' | 'parentId' | 'createdAt'> & {
  id: string;
  parentId: string | null;
  createdAt: string;
};

export interface WebSocketMessage {
  type: 'newMessage' | 'fetchMessages' | 'messages';
  message?: Message;
  messages?: Message[];
  content?: string;
  parentId?: string | null;
}