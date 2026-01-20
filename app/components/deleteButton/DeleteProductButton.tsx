'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import deleteProduct from '@/app/actions/products/deleteProduct.action';

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const confirm = window.confirm('sure?');
      if (!confirm) return;

      await deleteProduct(id);
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
