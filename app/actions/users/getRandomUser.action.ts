'use server';

import prisma from '@/app/lib/prisma';
import { getDbUserPublic } from './user.action';

export default async function getRandomUser() {
  const userId = await getDbUserPublic();
  try {
    const user = await prisma.user.findMany({
      where: {
        AND: {
          NOT: [
            {
              id: userId!.id,
            },
            {
              followers: {
                some: {
                  followerId: userId!.id,
                },
              },
            },
          ],
        },
      },
      select: {
        name: true,
        id: true,
        imageUrl: true,
        _count: {
          select: { followers: true, products: true },
        },
      },

      take: 5,
    });
    return { success: true, data: user };
  } catch (error) {
    console.error(error);
  }
}

export async function profile() {
  const userId = await getDbUserPublic();
  try {
    const user = await prisma.user.findMany({
      where: {
        id: userId!.id,
      },
      select: {
        name: true,
        id: true,
        imageUrl: true,
        _count: {
          select: {
            products: true,
            followers: true,
            following: true,
          },
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error(error);
  }
}
