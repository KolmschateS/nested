'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMessages(parentId: string | null) {
  return prisma.message.findMany({
    where: { parentId: parentId || null },
    orderBy: { createdAt: 'asc' },
  });
}

// Haal het hoofdbericht op dat overeenkomt met het roomId
export async function getMainMessage(id: string) {
  if (!id) {
    return null; // Voeg een fallback toe als id null is
  }
  return prisma.message.findUnique({
    where: { id },
  });
}


export async function sendMessage(content: string, parentId: string) {
  console.log(content, parentId);
  return prisma.message.create({
    data: {
      content,
      parentId,
    },
  });
}
