'use server';

import prisma from '@/app/lib/prisma';

export default async function deleteProduct(id: string) {
  try {
    const productDelete = await prisma.product.delete({ where: { id } });
    return { success: true, data: productDelete };
  } catch (error) {
    console.error(error);
  }
}
