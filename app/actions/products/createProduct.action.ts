'use server';

import prisma from '@/app/lib/prisma';
import { getDbUserPublic } from '../user.action';

interface CreateProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default async function createUserProduct({
  name,
  description,
  price,
  imageUrl,
}: CreateProduct) {
  const userId = await getDbUserPublic();
  try {
    const createProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        userId: userId!.id,
      },
    });
    return { success: true, data: createProduct };
  } catch (error) {
    console.error(error);
  }
}
