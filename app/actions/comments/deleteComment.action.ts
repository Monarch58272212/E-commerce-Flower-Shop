'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function deleteComment(commentId: string) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });
    revalidatePath('/');
    return { success: true, data: deletedComment };
  } catch (error) {
    console.error('Prisma delete comment error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteSecondComment(parentId: string) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: parentId },
    });
    revalidatePath('/');
    return { success: true, data: deletedComment };
  } catch (error) {
    console.error('Prisma delete comment error:', error);
    return { success: false, error: (error as Error).message };
  }
}
