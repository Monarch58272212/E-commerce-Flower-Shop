'use server';

import prisma from '@/app/lib/prisma';
import { getDbUserPublic } from '../user.action';

// All Products Public
export default async function getAllProducts() {
  try {
    const getProduct = await prisma.product.findMany({
      include: {
        user: {
          select: {
            products: true,
            id: true,
            name: true,
            imageUrl: true,
            _count: {
              select: { products: true },
            },
          },
        },
        comment: {
          include: {
            user: true,
            reply: {
              include: {
                user: true,
                children: {
                  include: {
                    user: true,
                    children: { include: { user: true } },
                  },
                },
              },
            },
          },
        },
      },
    });
    return { success: true, data: getProduct };
  } catch (error) {
    console.error(error);
  }
}

// All Products Private (User Specific)
export async function getAllUserProducts() {
  const userId = await getDbUserPublic();
  try {
    const getProduct = await prisma.product.findMany({
      where: { userId: userId!.id },
      include: {
        user: {
          select: {
            products: true,
            id: true,
            name: true,
            imageUrl: true,
            _count: {
              select: { products: true },
            },
          },
        },
        comment: {
          include: {
            user: true,
            reply: {
              include: {
                user: true,
                children: {
                  include: { user: true },
                },
              },
            },
          },
        },
      },
    });
    return { success: true, data: getProduct };
  } catch (error) {
    console.error(error);
  }
}
