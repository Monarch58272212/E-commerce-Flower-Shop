import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DeleteButton from '../deleteButton/DeleteProductButton';

interface User {
  id: string;
  name: string | null;
  imageUrl: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  user: User | null;
}

export default function DashboardChild({ prod }: { prod: Product }) {
  return (
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
  );
}
