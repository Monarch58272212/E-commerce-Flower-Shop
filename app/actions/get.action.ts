'use server';

import prisma from '../lib/prisma';

export default async function GetAllProduct() {
  const product = await prisma.product.findMany({
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
    },
  });

  return product;
}
