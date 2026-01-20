'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function deleteComment(id: string) {
  try {
    const commentDelete = await prisma.comment.delete({
      where: { id },
    });
    revalidatePath('/');
    return { success: true, data: commentDelete };
  } catch (error) {
    console.error(error);
  }
}
