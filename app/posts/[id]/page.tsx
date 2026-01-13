import { getDbUser } from '@/app/actions/user.action';
import { SingleSkeleton } from '@/app/components/Skeleton';

import UpdateButton from '@/app/components/UpdateButton';
import prisma from '@/app/lib/db/prisma';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: PageProps) {
  return (
    <Suspense fallback={<SingleSkeleton />}>
      <LoadThisPage params={params} />
    </Suspense>
  );
}

async function LoadThisPage({ params }: PageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) await getDbUser();
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: {
      user: true,
    },
  });

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">Product not found 🕳️</div>
    );
  }

  return (
    <>
      <div className="p-5 border border-gray-600 space-y-3 shadow-md mt-3 rounded-md">
        <h1 className="text-2xl font-bold">Name: {product.name}</h1>
        <p>{product.description}</p>
        <p>Owned by: {product.user.name}</p>
        <p>Price: {product.price}</p>

        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
        />
        <div className="w-full m-2 flex justify-between items-center">
          <Link href={'/Create'}>
            <Button variant={'link'}>Go Back</Button>
          </Link>

          <UpdateButton product={product} />
        </div>
      </div>
    </>
  );
}
