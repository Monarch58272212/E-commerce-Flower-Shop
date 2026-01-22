'use client';

import createFollow from '@/app/actions/follower-and-following/createFollow.action';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface FollowButtonProps {
  userId: string;
}
export default function CreateFollow({ userId }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleCreateFollow = async () => {
    try {
      setIsFollowing(true);
      const result = await createFollow(userId);
      if (result.success) {
        toast.success('Followed successfully');
      } else {
        toast.error(result.error || 'Failed to follow');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFollowing(false);
    }
  };
  return (
    <Button onClick={handleCreateFollow} disabled={isFollowing}>
      {isFollowing ? 'Following...' : 'Follow'}
    </Button>
  );
}
