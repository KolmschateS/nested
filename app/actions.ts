'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMessages(parentId: string | null) {
  return prisma.message.findMany({
    where: { parentId: parentId || null },
    orderBy: { createdAt: 'asc' },
  });
}

export async function sendMessage(content: string, parentId: string | null) {
  return prisma.message.create({
    data: {
      content,
      parentId,
    },
  });
}