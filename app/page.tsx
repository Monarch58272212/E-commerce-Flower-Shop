import { Suspense } from 'react';
import AllProduct from './components/AllProduct';
import { SkeletonCard } from './components/skeletons/Skeleton';

export default async function Home() {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <AllProduct />
    </Suspense>
  );
}
