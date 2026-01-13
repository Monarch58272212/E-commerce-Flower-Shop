import CreatePost from '../components/CreatePost';
import { Suspense } from 'react';
import Dashboard from '../components/Dashboard';
import { SkeletonCard } from '../components/Skeleton';

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
