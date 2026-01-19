'use client';

import { Button } from '@/components/ui/button';
import DeletePost from '../../actions/deletePost.action';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProductId {
  id: string;
}

export default function DeleteButton({ id }: ProductId) {
  const [loading, setLoading] = useState(false);
  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const confirm = window.confirm('sure?');
      if (!confirm) return;

      await DeletePost(id);
      location.reload();
      toast.success('Deleted Successfully');
    } catch (error) {
      console.error('error dire pre sa client', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        size={'sm'}
        onClick={handleDeleteProduct}
        disabled={loading}
        variant={'destructive'}
      >
        {loading ? 'Loading...' : 'Delete'}
      </Button>
    </>
  );
}

export function DeleteSecondButton({ id }: ProductId) {
  const [loading, setLoading] = useState(false);
  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const confirm = window.confirm('sure?');
      if (!confirm) return;

      await DeletePost(id);
      location.reload();
      toast.success('Deleted Successfully');
    } catch (error) {
      console.error('error dire pre sa client', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        size={'sm'}
        onClick={handleDeleteProduct}
        disabled={loading}
        variant={'destructive'}
      >
        {loading ? 'Loading...' : 'Delete'}
      </Button>
    </>
  );
}
