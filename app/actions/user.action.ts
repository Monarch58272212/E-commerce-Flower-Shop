'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../lib/prisma';
import { redirect } from 'next/navigation';

export default async function asyncUser() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const createUser = await prisma.user.create({
      data: {
        kindeId: user.id,
        name: `${user?.given_name ?? 'User'} ${user?.family_name ?? ''}`.trim(),
        email: user?.email || '',
        imageUrl: user?.picture,
      },
    });
    return createUser;
  } catch (error) {
    console.error('Error creating or fetching user:', error);
    throw error;
  }
}

export async function getUserByKindeId(kindeId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { kindeId },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.log('Error fetching user by Clerk ID:', error);
  }
}

export async function getDbUser() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser?.id) {
    redirect('/api/auth/login');
  }

  const user = await getUserByKindeId(kindeUser.id);
  if (!user) throw new Error('User not found in database');
  return user;
}

export async function getDbUserPublic() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser?.id) return null;

  const user = await getUserByKindeId(kindeUser.id);
  if (!user) throw new Error('User not found in database');
  return user;
}
