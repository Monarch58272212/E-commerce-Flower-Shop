import { Suspense } from 'react';

import { SkeletonCard } from './components/skeletons/Skeleton';
import AllProduct from './components/Test';

export default async function Home() {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <AllProduct />
    </Suspense>
  );
}
