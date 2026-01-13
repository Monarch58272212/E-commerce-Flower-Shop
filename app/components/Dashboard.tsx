import Image from 'next/image';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getDbUser } from '../actions/user.action';
import prisma from '../lib/db/prisma';
import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import DeleteButton from './DeleteButton';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  user: {
    name?: string | null;
    imageUrl?: string | null;
  };
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  const db = await getDbUser();

  const product: Product[] = await prisma.product.findMany({
    where: { userId: db?.id },
    include: {
      user: true,
    },
  });

  return (
    <div className="w-screen h-md  flex flex-col justify-center items-center gap-5 p-3">
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

            <Avatar>
              <AvatarImage src={prod.user?.imageUrl || ''} />
              <AvatarFallback>{prod.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-2">{prod.name}</h2>
            <p className="text-gray-600 mb-2">{prod.description}</p>
            <p className="text-green-600 font-bold mb-2">${prod.price}</p>
            <div className="flex gap-3">
              <Link href={`/posts/${prod.id}`}>
                <Button variant={'secondary'}>Edit</Button>
              </Link>

              <DeleteButton id={prod.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
