'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import createPost from '../actions/post.action';
import toast from 'react-hot-toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function CreatePost() {
  const { user } = useKindeBrowserClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price.trim() || !imageUrl) {
      return toast.error('Please put valid data');
    }
    setLoading(true);

    try {
      const result = await createPost({
        name,
        description,
        price: Number(price),
        imageUrl,
      });

      if (result?.success) {
        setName('');
        setDescription('');
        setImageUrl(null);
        setPrice('');
        toast.success('Created Successfully');
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full sm:mx-1.5 max-w-lg p-3 border rounded-md border-gray-500 gap-3 mt-3 bg-gray-100"
      >
        <p>{user?.given_name && user?.given_name}</p>
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files?.[0] || null)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </>
  );
}
