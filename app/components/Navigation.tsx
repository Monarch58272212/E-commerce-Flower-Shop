import { Button } from '@/components/ui/button';
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import Link from 'next/link';
import { BsCartCheckFill } from 'react-icons/bs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import asyncUser from '../actions/users/user.action';

export default async function Navigation() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);
  if (user) {
    await asyncUser();
  }

  return (
    <div className="w-[90%] mt-3 flex border relative border-gray-500 justify-between items-center top-0 p-3 rounded-full shadow-sm bg-white  z-50">
      <Link href="/">
        <Image
          src="/GreenLogoWithName.png"
          alt="Logo"
          width={80}
          height={80}
          priority
        />
      </Link>

      {user ? (
        <div className="flex flex-row items-center gap-3">
          <>
            <Link href="/Create">
              <Button
                variant="ghost"
                className="p-6 w-12.5 h-12.5 shadow-sm rounded-full"
                size="sm"
              >
                <BsCartCheckFill />
              </Button>
            </Link>

            <Avatar>
              <AvatarImage src={user?.picture || ''} />
              <AvatarFallback>{user?.given_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="px-4 py-2">
              <LogoutLink>Log out</LogoutLink>
            </Button>
          </>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-3">
          <>
            <Button variant={'destructive'} className="px-4 py-2">
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button variant={'secondary'} className="px-4 py-2">
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </>
        </div>
      )}
    </div>
  );
}
