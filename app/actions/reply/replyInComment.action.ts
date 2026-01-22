'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { getDbUserPublic } from '../users/user.action';

interface ReplyInComment {
  commentId: string;
  message: string;
}

export default async function replyInComment({
  commentId,
  message,
}: ReplyInComment) {
  const userId = await getDbUserPublic();
  try {
    const replyToComment = await prisma.reply.create({
      data: {
        commentId: commentId,
        message,
        userId: userId!.id,
      },
    });
    revalidatePath('/');
    return { success: true, data: replyToComment };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create reply' };
  }
}
