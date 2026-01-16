'use server';

import prisma from '@/app/lib/prisma';
import { getDbUser } from '../user.action';
import { revalidatePath } from 'next/cache';

interface Reply {
  message: string;
  userId: string;
  commentId: string;
}

export default async function createReply({ message, commentId }: Reply) {
  const user = await getDbUser();
  try {
    const createReply = await prisma.reply.create({
      data: {
        message,
        userId: user.id,
        commentId,
      },
    });
    revalidatePath('/');
    return { success: true, data: createReply };
  } catch (error) {
    console.error('Prisma create reply error:', error);
    return { success: false, error: (error as Error).message };
  }
}
