'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getDbUser } from '../user.action';

interface Data {
  message: string;
  userId: string;
  productId: string;
}

export async function createComment({ message, userId, productId }: Data) {
  if (!userId || !productId) throw new Error('Missing userId or productId');
  const user = await getDbUser();

  try {
    const comment = await prisma.comment.create({
      data: {
        message,
        userId: user.id,
        productId,
      },
    });
    revalidatePath('/');
    return { success: true, data: comment };
  } catch (error) {
    console.error('Prisma create comment error:', error);
    return { success: false, error: (error as Error).message };
  }
}
