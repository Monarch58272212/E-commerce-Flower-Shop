'use client';

import { createReplyToFirstComment } from '@/app/actions/reply/createReply.action';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IdReply {
  commentId: string;
}

export default function ReplyButton({ commentId }: IdReply) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!message.trim()) return toast.error('paki butangan tanan boyyy');

    try {
      const replyInComment = await createReplyToFirstComment({
        message,
        commentId,
      });
      if (replyInComment.success) {
        toast.success('create reply success boyyy');
        setMessage('');
        setIsOpen(false);
      } else {
        toast.error('yati mali ka sa reply boyy');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong sa reply nimo brad');
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
                placeholder="reply this comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Reply'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
