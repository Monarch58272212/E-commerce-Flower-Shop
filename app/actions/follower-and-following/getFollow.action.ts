'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { getDbUserPublic } from '../users/user.action';

export default async function getFollow(followingId: string) {
  const userId = await getDbUserPublic();

  try {
    const followUser = await prisma.follows.findMany({
      where: {
        followerId: userId!.id,
        followingId,
      },
    });
    revalidatePath('/');
    return { success: true, data: followUser };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create follow' };
  }
}
