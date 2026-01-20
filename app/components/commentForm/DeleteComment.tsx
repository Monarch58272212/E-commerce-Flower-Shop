'use client';

import deleteComment from '@/app/actions/comments/deleteComment.action';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdDeleteOutline } from 'react-icons/md';

export default function DeleteComment({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const confirm = window.confirm(
        'Are you sure you want to delete this comment?',
      );
      if (!confirm) return;
      const res = await deleteComment(id);
      if (res?.success) {
        toast.success('Comment deleted successfully');
      } else {
        toast.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('error dire pre sa client', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDelete} disabled={loading} variant={'outline'}>
      {loading ? 'Deleting...' : <MdDeleteOutline className="text-red-900" />}
    </Button>
  );
}
