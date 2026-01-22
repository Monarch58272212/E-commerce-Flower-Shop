import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getRandomUser from '../actions/users/getRandomUser.action';
import CreateFollow from './follow/CreateFollow';

export default async function RandomUsers() {
  const users = await getRandomUser();
  if (users?.data.length === 0) {
    return <p className="p-4">No users to follow</p>;
  }
  return (
    <>
      {users?.data?.map((user) => (
        <div
          key={user.id}
          className="flex flex-row w-full justify-start items-center p-3 gap-3"
        >
          <div className="flex flex-row w-full p-3 gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.imageUrl || ''} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-gray-600 text-sm">
                {user.name?.toLocaleLowerCase()}
              </p>
              <p className="text-gray-800 font-medium">
                {user._count.followers} followers
              </p>
            </div>
          </div>

          <div>
            <CreateFollow userId={user.id} />
          </div>
        </div>
      ))}
    </>
  );
}
