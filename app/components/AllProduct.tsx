import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import DeleteUserProduct from './deleteButton/DeleteUserProduct';
import { getDbUser } from '../actions/user.action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CommentForm from './CommentForm';
import { GetAllProduct } from '../actions/get.action';
import { GetAllComment } from '../actions/comments/getComment.action';

export default async function AllProduct() {
  const product = await GetAllProduct();
  const dbUser = await getDbUser();
  const getComments = await GetAllComment();

  return (
    <div className="w-screen h-md  flex flex-col justify-center items-center gap-5 p-3">
      <p>All Product</p>
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 ">
        {product.map((prod) => (
          <div
            key={prod.id}
            className="border flex flex-col gap-3  border-gray-300 rounded-lg p-4 m-2 shadow-md"
          >
            <div className="relative w-full h-50">
              <Image
                src={prod.imageUrl}
                alt={prod.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <p>{prod.user.name}</p>
            <div className="flex justify-start items-center gap-3">
              <Avatar>
                <AvatarImage src={prod.user?.imageUrl || ''} />
                <AvatarFallback>{prod.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-light test-xs">
                Products: {prod.user._count.products}
              </p>
              {new Date(prod.createdAt).toLocaleDateString()}
            </div>

            <h2 className="text-xl font-semibold mb-2">{prod.name}</h2>
            <p className="text-gray-600 mb-2">{prod.description}</p>
            <p className="text-green-600 font-bold mb-2">${prod.price}</p>
            {dbUser?.id === prod.user.id && (
              <div className="flex justify-between ">
                <Link href={`/posts/${prod.id}`}>
                  <Button variant={'default'}>Edit</Button>
                </Link>
                <DeleteUserProduct id={prod.id} />
              </div>
            )}
            <div className="flex justify-center items-center">
              <CommentForm productId={prod.id} userId={dbUser.id} />
            </div>

            <>
              {getComments
                .filter((c) => c.productId === prod.id)
                .map((comment) => (
                  <div key={comment.id} className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={comment.user?.imageUrl || ''} />
                      <AvatarFallback>
                        {comment.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-gray-700">{comment.user?.name}</p>
                      <p className="text-gray-900">{comment.message}</p>
                    </div>
                  </div>
                ))}
            </>
          </div>
        ))}
      </div>
    </div>
  );
}
