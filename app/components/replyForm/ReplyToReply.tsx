'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import replyInReply from '@/app/actions/reply/replyToReply.action';

interface CommentFormProps {
  productId: string;
}

export default function ReplyToReply({ productId }: CommentFormProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Please write a reply!');
      return;
    }

    setLoading(true);
    try {
      const res = await replyInReply({
        commentId: productId,
        message,
      });

      if (res?.success) {
        setMessage('');
        toast.success('Reply added!');
        setIsOpen(false);
      } else {
        toast.error(res?.error || 'Failed to add reply');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            Reply
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Update this product if only neccessary.
            </DialogDescription>

            <form
              onSubmit={handleReplySubmit}
              className="flex flex-col justify-center items-center w-full sm:mx-1.5 max-w-lg p-3 border rounded-md border-gray-500 gap-3 mt-3 bg-gray-100"
            >
              <Textarea
                placeholder="Write your reply..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Reply'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
