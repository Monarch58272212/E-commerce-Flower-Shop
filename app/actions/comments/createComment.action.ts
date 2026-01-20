'use server';

import prisma from '@/app/lib/prisma';
import { getDbUserPublic } from '../user.action';
import { revalidatePath } from 'next/cache';

interface CreateComment {
  message: string;
  productId: string;
}

export default async function createComment({
  message,
  productId,
}: CreateComment) {
  const userId = await getDbUserPublic();
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
