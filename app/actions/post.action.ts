'use server';

import prisma from '../lib/prisma';
import { getDbUser } from './user.action';
import { revalidatePath } from 'next/cache';

interface AddProductParams {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default async function createPost({
  name,
  description,
  price,
  imageUrl,
}: AddProductParams) {
  try {
    const userId = await getDbUser();

    if (!userId) {
      throw new Error('You must be logged in to add a product');
    }

    const newProduct = await prisma.product.create({
      data: {
        userId: userId.id,
        name,
        description,
        price,
        imageUrl,
      },
    });
    revalidatePath('/Create');
    return { success: true, product: newProduct };
  } catch (error) {
    console.log('Error adding product:', error);
  }
}
