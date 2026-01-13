'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UpdateProduct from '../actions/updateProduct.action';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function UpdateProductForm({ product }: { product: Props }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [description, setDescription] = useState(product.description);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await UpdateProduct({
        id: product.id,
        name,
        price: Number(price),
        imageUrl,
        description,
      });

      if (result?.success) {
        toast.success('Product updated successfully!');
        setDescription('');
        setImageUrl('');
        setName('');
        setPrice(0);
        setIsOpen(false);
      } else {
        toast.error('May error sa pag update ni dire par');
      }
    } catch (error) {
      console.error('naay mali sa imong modal sa update boy ', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={'default'}> Update </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Update this product if only neccessary.
            </DialogDescription>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={190}
              height={190}
            />

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Price"
                required
              />
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Loading...' : 'Update'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
