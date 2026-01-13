import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GetAllProduct from '../actions/get.action';
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
    _count: { products: number };
  };
}

export default async function AllProduct() {
  const product: Product[] = await GetAllProduct();

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
          </div>
        ))}
      </div>
    </div>
  );
}
