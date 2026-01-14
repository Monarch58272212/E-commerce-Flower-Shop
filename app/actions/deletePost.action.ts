'use server';

import prisma from '../lib/prisma';

export default async function DeletePost(id: string) {
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return deleteProduct;
  } catch (err) {
    console.error(err);
  }
}
