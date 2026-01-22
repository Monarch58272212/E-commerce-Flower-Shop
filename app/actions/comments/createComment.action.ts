'use server';

import prisma from '@/app/lib/prisma';

import { revalidatePath } from 'next/cache';
import { getDbUserPublic } from '../users/user.action';

interface CreateComment {
  message: string;
  productId: string;
}

export default async function createComment({
  message,
  productId,
}: CreateComment) {
  const userId = await getDbUserPublic();

  if (!userId) {
    return { success: false, error: 'User not authenticated' };
  }

  try {
    const createProduct = await prisma.comment.create({
      data: {
        message,
        productId,
        userId: userId!.id,
      },
    });
    revalidatePath('/');
    return { success: true, data: createProduct };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create comment' };
  }
}
