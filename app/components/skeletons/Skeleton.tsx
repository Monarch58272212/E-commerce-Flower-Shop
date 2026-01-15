'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 ">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border flex flex-col gap-3  border-gray-300 rounded-lg p-4 m-2 shadow-md"
        >
          <Skeleton className="relative w-full h-50 bg-gray-600" />
          <div className="space-y-2">
            <Skeleton className="h-4 bg-gray-600 w-62" />
            <Skeleton className="h-4 bg-gray-600 w-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SingleSkeleton() {
  return (
    <div className="border flex flex-col gap-3  border-gray-300 rounded-lg p-4 m-2 shadow-md">
      <Skeleton className="relative w-full h-50 bg-gray-600" />
      <div className="space-y-2">
        <Skeleton className="h-4 bg-gray-600 w-62" />
        <Skeleton className="h-4 bg-gray-600 w-50" />
      </div>
    </div>
  );
}
