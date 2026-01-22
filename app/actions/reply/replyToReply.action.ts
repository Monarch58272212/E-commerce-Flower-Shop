'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { getDbUserPublic } from '../users/user.action';

interface ReplyInComment {
  commentId: string;
  message: string;
}

export default async function replyInReply({
  commentId,
  message,
}: ReplyInComment) {
  const userId = await getDbUserPublic();
  try {
    const replyToReply = await prisma.reply.create({
      data: {
        userId: userId!.id,
        parentId: commentId,
        message,
      },
    });
    revalidatePath('/');
    return { success: true, data: replyToReply };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create reply' };
  }
}
