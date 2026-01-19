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

interface Data {
  message: string;
  userId: string;
  productId: string;
}

//CREATE COMMENT
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
//REPLY TO FIRST COMMENT
export async function createReplyToFirstComment({
  message,
  commentId,
}: ReplyToComment) {
  const user = await getDbUser();

  const parentComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!parentComment) {
    return { success: false, error: 'Parent comment not found.' };
  }
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

//REPLY TO REPLY
export async function createReplyToReply({
  message,
  parentId,
}: ReplyToComment) {
  const user = await getDbUser();

  const parentReply = await prisma.reply.findUnique({
    where: { id: parentId },
  });

  if (!parentReply) {
    throw new Error('Parent reply not found.');
  }
  try {
    const reply = await prisma.reply.create({
      data: {
        userId: user.id,
        message,
        parentId,
        commentId: parentReply.commentId,
      },
    });
    revalidatePath('/');
    return { success: true, data: reply };
  } catch (error) {
    console.error('Prisma create comment error:', error);
    return { success: false, error: (error as Error).message };
  }
}
