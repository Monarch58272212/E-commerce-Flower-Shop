'use client';
import deleteComment, {
  deleteSecondComment,
} from '@/app/actions/comments/deleteComment.action';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface DeleteCommentProps {
  commentId: string;
}

interface DeleteSecondCommentProps {
  parentId: string;
}

export default function DeleteComment({ commentId }: DeleteCommentProps) {
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      // Call your delete comment action here
      const confirm = window.confirm(
        'Are you sure you want to delete this comment?',
      );
      if (!confirm) return;

      const res = await deleteComment(commentId);
      if (!res.success) {
        toast.error('Failed to delete comment');
      } else {
        toast.success('Comment deleted successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while deleting the comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDeleteComment}
      disabled={loading}
      variant={'destructive'}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
}

export function DeleteSecondComment({ parentId }: DeleteSecondCommentProps) {
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      // Call your delete comment action here
      const confirm = window.confirm(
        'Are you sure you want to delete this comment?',
      );
      if (!confirm) return;

      const res = await deleteSecondComment(parentId);
      if (!res.success) {
        toast.error('Failed to delete comment');
      } else {
        toast.success('Comment deleted successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while deleting the comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDeleteComment}
      disabled={loading}
      variant={'destructive'}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
