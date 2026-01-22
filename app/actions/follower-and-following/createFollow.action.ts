'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { getDbUser } from '../users/user.action';

export default async function createFollow(followingId: string) {
  const userId = await getDbUser();

  if (userId.id === followingId) {
    return { success: false, error: 'You cannot follow yourself' };
  }

  const follow = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId.id,
        followingId: followingId,
      },
    },
  });

  if (follow) {
    return { success: false, error: 'You are already following this user' };
  }

  try {
    const followUser = await prisma.follows.create({
      data: {
        followerId: userId.id,
        followingId: followingId,
      },
    });
    revalidatePath('/');
    return { success: true, data: followUser };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create follow' };
  }
}
