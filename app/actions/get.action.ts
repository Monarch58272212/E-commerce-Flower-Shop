'use server';

import prisma from '../lib/prisma';
import { getDbUserPublic } from './user.action';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  user: {
    name?: string | null;
    imageUrl?: string | null;
  };
}

export async function GetAllProduct() {
  const allProduct = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      },
      comment: {
        include: {
          user: true,
          reply: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return allProduct;
}

export default async function GetUserProduct() {
  const user = await getDbUserPublic();

  const product = await prisma.product.findMany({
    where: { userId: user?.id },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  return product;
}
