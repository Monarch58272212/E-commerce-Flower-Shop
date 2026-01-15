'use server';
import prisma from '../lib/prisma';
import { getDbUser } from './user.action';

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

export async function DeleteUserProductPost(id: string) {
  try {
    const user = await getDbUser();
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new Error('Product not found');
    if (product.userId !== user?.id) {
      throw new Error('You are not allowed to delete this product');
    }

    const deleteProduct = await prisma.product.delete({
      where: { id },
    });
    return deleteProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
