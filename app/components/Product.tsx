import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getDbUser } from '../actions/user.action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import getAllProducts from '../actions/products/getAllProducts.action';
import DeleteButton from './deleteButton/DeleteProductButton';
import DeleteComment from './commentForm/DeleteComment';
import CommentForm from './commentForm/CommentForm';
import ReplyToComment from './replyForm/ReplyToComment';
import { MdArrowRight } from 'react-icons/md';
import ReplyToReply from './replyForm/ReplyToReply';

export default async function AllProduct() {
  const product = await getAllProducts();
  const dbUser = await getDbUser();

  return (
    <div className="w-screen h-md  flex flex-col justify-center items-center gap-5 p-3">
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 ">
        {product?.data?.map((prod) => (
          <div
            key={prod.id}
            className="border border-gray-300 rounded-xl shadow-lg p-4 m-2 max-w-lg flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src={prod.imageUrl}
                alt={prod.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Owner Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={prod.user?.imageUrl || ''} />
                <AvatarFallback>{prod.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium text-gray-800">{prod.user.name}</p>
                <p className="text-xs text-gray-500">
                  Products: {prod.user._count.products}
                </p>
              </div>
              <p className="ml-auto text-xs text-gray-400">
                {new Date(prod.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Product Details */}
            <h2 className="text-lg font-semibold">{prod.name}</h2>
            <p className="text-gray-600">{prod.description}</p>
            <p className="text-green-600 font-bold text-lg">${prod.price}</p>

            {/* Edit/Delete Buttons if owner */}
            {dbUser?.id === prod.user.id && (
              <div className="flex justify-between mt-2">
                <Link href={`/posts/${prod.id}`}>
                  <Button variant="default" size="sm">
                    Edit
                  </Button>
                </Link>
                <DeleteButton id={prod.id} />
              </div>
            )}

            <div className="flex items-start gap-2 mt-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={dbUser.imageUrl || ''} />
                <AvatarFallback>{dbUser.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <CommentForm productId={prod.id} />
            </div>

            {/* first Comment */}
            {prod.comment.map((c) => (
              <div
                key={c.id}
                className="flex flex-col justify-center items-start"
              >
                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={c.user.imageUrl || ''} />
                    <AvatarFallback>{c.user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-600 text-xs">{c.user.name}</p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p className="mt-1">{c.message}</p>
                  <div className="flex gap-3 justify-center items-center">
                    <ReplyToComment productId={c.id} />
                    <DeleteComment id={c.id} />
                  </div>
                </div>
                {/* Reply to comment */}
                <>
                  {c.reply.map((r) => (
                    <div
                      key={r.id}
                      className="flex ml-10 flex-col justify-center items-start"
                    >
                      <div className="flex gap-2 items-center">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={r.user.imageUrl || ''} />
                          <AvatarFallback>
                            {r.user.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-600 text-xs">
                            {r.user.name?.toLocaleLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex w-full justify-between items-center">
                          <p className="mt-1">{r.message}</p>
                          <ReplyToReply productId={r.id} />
                        </div>
                      </div>

                      {/* Reply to reply */}
                      {r.children.map((rr) => (
                        <div
                          key={rr.id}
                          className="flex ml-15 flex-col justify-center items-start"
                        >
                          <div className="flex gap-2 items-center">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={rr.user.imageUrl || ''} />
                              <AvatarFallback>
                                {rr.user.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-gray-600 text-xs">
                                {rr.user.name?.toLocaleLowerCase()}
                              </p>
                              <div className="flex justify-center items-center">
                                <p className="text-gray-600 text-xs">
                                  {rr.user.name?.toLocaleLowerCase()}
                                </p>
                                <MdArrowRight />
                                <p className="text-gray-800 text-xs">
                                  {r.user.name?.toLocaleLowerCase()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-full justify-between items-center">
                            <div className="flex w-full justify-between items-center">
                              <p className="mt-1">{rr.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
