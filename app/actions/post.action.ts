'use server';

import cloudinary from '../lib/cloudinary';
import prisma from '../lib/prisma';
import { getDbUser } from './user.action';
import { revalidatePath } from 'next/cache';

interface AddProductParams {
  name: string;
  description: string;
  price: number;
  imageUrl: File;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
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

    if (!imageUrl || imageUrl.size === 0) {
      throw new Error('Image is required');
    }

    // Convert File → Buffer
    const arrayBuffer = await imageUrl.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload sa Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'products' }, (error, result) => {
            if (error) reject(error);
            else if (!result?.secure_url)
              reject(new Error('Cloudinary upload failed'));
            else resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      },
    );

    const newProduct = await prisma.product.create({
      data: {
        userId: userId.id,
        name,
        description,
        price,
        imageUrl: uploadResult.secure_url,
      },
    });
    revalidatePath('/Create');
    return { success: true, data: newProduct };
  } catch (error) {
    console.log('Error adding product:', error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}
