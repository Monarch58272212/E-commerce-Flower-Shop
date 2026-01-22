import CreatePost from '../components/CreatePost';
import { Suspense } from 'react';
import { SkeletonCard } from '../components/skeletons/Skeleton';
import Dashboard from '../components/dashboard/Dashboard';

export default function AddProductForm() {
  return (
    <>
      <CreatePost />
      <Suspense fallback={<SkeletonCard />}>
        <Dashboard />
      </Suspense>
    </>
  );
}
