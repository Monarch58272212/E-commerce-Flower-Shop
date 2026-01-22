import { Suspense } from 'react';

import { SkeletonCard } from './components/skeletons/Skeleton';
import AllProduct from './components/Product';
import RandomUsers from './components/RandomUsers';
import Profile from './components/Profile';

export default async function Home() {
  return (
    <div className="p-10 flex flex-col w-screen gap-10 justify-center items-center">
      <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-3 items-start">
        <div className="border border-gray-300 rounded-xl shadow-lg p-4 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300">
          <Profile />
        </div>
        <Suspense fallback={<SkeletonCard />}>
          <AllProduct />
        </Suspense>

        <div className=" border border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 hover:shadow-xl transition-shadow duration-300 ">
          <RandomUsers />
        </div>
      </div>
    </div>
  );
}
