'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DeleteUserProduct({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button disabled={loading} variant={'destructive'}>
        {loading ? 'Loading...' : 'Delete'}
      </Button>
    </>
  );
}
