'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../lib/db/prisma';

interface AddProductParams {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string;
}

export default async function UpdateProduct({
  name,
  price,
  imageUrl,
  description,
  id,
}: AddProductParams) {
  try {
    const update = await prisma.product.update({
      where: { id },
      data: { name, price, imageUrl, description },
    });
    revalidatePath('/Create');
    return { success: true, data: update };
  } catch (error) {
    console.error('Update error:', error);
  }
}
