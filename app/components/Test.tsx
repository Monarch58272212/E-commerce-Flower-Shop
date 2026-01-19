import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DeleteUserProduct from './deleteButton/DeleteUserProduct';
import { getDbUser } from '../actions/user.action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CommentForm from './CommentForm';
import { GetAllProduct } from '../actions/getAllProducts.action';
import ReplyButton from './replyButton/ReplyToFirstComment';
import ReplyToReply from './replyButton/ReplyToReply';
import DeleteComment from './deleteButton/DeleteComment';

export default async function AllProduct() {
  const product = await GetAllProduct();
  const dbUser = await getDbUser();

  return (
    <div className="w-screen h-md  flex flex-col justify-center items-center gap-5 p-3">
      <p>All Product</p>
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 ">
        {product.map((prod) => (
          <div
            key={prod.id}
            className="border flex flex-col gap-3 max-w-lg border-gray-300 rounded-lg p-4 m-2 shadow-md"
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
            <div className="flex justify-center items-start">
              <Avatar className="h-6 w-6">
                <AvatarImage src={dbUser.imageUrl || ''} />
                <AvatarFallback>{dbUser.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <CommentForm productId={prod.id} userId={dbUser.id} />
            </div>

            {/* first Comment */}
            <>
              {prod.comment.map((firstComment) => (
                <div
                  key={firstComment.id}
                  className="flex flex-col ml-3 gap-3 justify-start items-start"
                >
                  <div className="flex  gap-3 justify-start items-center">
                    <div className="flex  gap-1 justify-start items-center">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={firstComment.user.imageUrl || ''} />
                        <AvatarFallback>
                          {firstComment.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-gray-600 text-xs">
                        {firstComment.user.name?.toLowerCase()}
                      </p>
                    </div>
                    <p className="text-green-800 text-xs">
                      first Comment: {firstComment.message}
                    </p>
                    <ReplyButton commentId={firstComment.id} />{' '}
                    <DeleteComment commentId={firstComment.id} />
                  </div>

                  {/* 2nd Comment */}
                  {firstComment.reply.map((SecondComment) => (
                    <div
                      key={SecondComment.id}
                      className="flex ml-5 gap-3 flex-col justify-start items-start"
                    >
                      <div className="flex  gap-1 justify-start items-center">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={SecondComment.user.imageUrl || ''}
                          />
                          <AvatarFallback>
                            {SecondComment.user.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-gray-600 text-xs">
                          {SecondComment.user.name?.toLowerCase()}
                        </p>
                      </div>
                      <p className="text-gray-600 text-xs">
                        {SecondComment.user.name?.toLowerCase()}
                        <span> &gt; </span>
                        {firstComment.user.name?.toLowerCase()}
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-red-900 text-xs">
                          Second Comment: {SecondComment.message}
                        </p>
                        <ReplyToReply
                          parentId={SecondComment.id} // kung kanino ka nag reply
                          commentId={firstComment.id} // original comment id
                        />
                        <DeleteComment commentId={SecondComment.id} />
                      </div>

                      {SecondComment.children.map((child) => (
                        <div
                          key={child.id}
                          className="flex ml-6 gap-3 justify-start items-center"
                        >
                          <div className="flex  gap-1 justify-start items-center">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={child.user.imageUrl || ''} />
                              <AvatarFallback>
                                {child.user.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-gray-600 text-xs">
                              {child.user.name?.toLowerCase()}
                            </p>
                          </div>
                          <div className="flex  gap-1 justify-start items-center">
                            <p className="text-blue-900 text-xs">
                              Second Comment: {child.message}
                            </p>
                            <ReplyToReply
                              parentId={child.id} // sino ka nagrereply ngayon
                              commentId={firstComment.id} // root comment id
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </>
          </div>
        ))}
      </div>
    </div>
  );
}
