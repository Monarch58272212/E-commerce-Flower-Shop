'use client';

import { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import createComment from '@/app/actions/comments/createComment.action';

interface CommentFormProps {
  productId: string;
}

export default function CommentForm({ productId }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error('Please write a comment!');
      return;
    }

    setLoading(true);
    try {
      const res = await createComment({ message: comment, productId });

      if (res?.success) {
        setComment('');
        toast.success('Comment added!');
      } else {
        toast.error(res?.error || 'Failed to add comment');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="flex flex-col justify-center items-center w-full sm:mx-1.5 max-w-lg p-3 border rounded-md border-gray-500 gap-3 mt-3 bg-gray-100"
    >
      <Textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Comment'}
      </Button>
    </form>
  );
}
