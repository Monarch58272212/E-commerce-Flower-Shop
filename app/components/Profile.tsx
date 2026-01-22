import React from 'react';
import { profile } from '../actions/users/getRandomUser.action';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';

export default async function Profile() {
  const users = await profile();
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 p-4">
        {users?.data.map((user) => (
          <div
            key={user.id}
            className="flex flex-col w-full justify-center items-center p-3 gap-3"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.imageUrl || ''} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-600 text-sm">
                {user.name?.toLocaleLowerCase()}
              </p>
              <div className="flex gap-4 justify-center items-center">
                <p className="text-gray-800 font-medium">
                  {user._count.followers} followers
                </p>
                <p className="text-gray-800 font-medium">
                  {user._count.following} following
                </p>
                <p className="text-gray-800 font-medium">
                  {user._count.products} products
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
