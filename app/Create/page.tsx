import CreatePost from '../components/CreatePost';
import { Suspense } from 'react';
import { SkeletonCard } from '../components/Skeleton';
import Dashboard from '../components/Dashboard';

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
