'use server';

import prisma from '@/app/lib/prisma';
import { getDbUser } from '../user.action';
import { revalidatePath } from 'next/cache';
interface ReplyToComment {
  message: string;
  commentId: string;
  parent?: string;
  parentId?: string;
}

export async function createReplyToFirstComment({
  message,
  commentId,
}: ReplyToComment) {
  const user = await getDbUser();
  try {
    const reply = await prisma.reply.create({
      data: {
        userId: user.id,
        message,
        commentId,
      },
    });
    revalidatePath('/');
    return { success: true, data: reply };
  } catch (error) {
    console.error('Prisma create comment error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createReplyToReply({
  message,
  parentId,
  commentId,
}: ReplyToComment) {
  const user = await getDbUser();
  try {
    const reply = await prisma.reply.create({
      data: {
        userId: user.id,
        message,
        commentId,
        parentId: parentId || undefined,
      },
    });
    revalidatePath('/');
    return { success: true, data: reply };
  } catch (error) {
    console.error('Prisma create comment error:', error);
    return { success: false, error: (error as Error).message };
  }
}
