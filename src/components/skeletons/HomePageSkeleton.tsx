'use client';

import SkeletonBase from './SkeletonBase';

const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      {/* Hero Section Skeleton */}
      <div className="relative h-96 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-700">
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4">
          <SkeletonBase className="h-12 w-80 max-w-full" />
          <SkeletonBase className="h-6 w-64 max-w-full" />
          <div className="flex gap-4 mt-6">
            <SkeletonBase className="h-12 w-32" />
            <SkeletonBase className="h-12 w-32" />
          </div>
        </div>
        {/* Carousel Skeleton */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <SkeletonBase className="w-16 h-16 rounded-lg" />
          <SkeletonBase className="w-16 h-16 rounded-lg" />
          <SkeletonBase className="w-16 h-16 rounded-lg" />
        </div>
      </div>

      {/* Products Section Skeleton */}
      <main className="app-container app-padding py-4">
        <div className="mb-4">
          <SkeletonBase className="h-8 w-32 mb-2" />
          <SkeletonBase className="h-4 w-64" />
        </div>

        {/* Search and Filter Skeleton */}
        <div className="mb-4 space-y-3">
          <SkeletonBase className="h-12 w-full rounded-xl" />
          <div className="flex justify-between items-center">
            <SkeletonBase className="h-10 w-24 rounded-lg" />
            <SkeletonBase className="h-10 w-40 rounded-lg" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="app-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="app-card">
              <SkeletonBase className="aspect-square w-full rounded-lg mb-3" />
              <SkeletonBase className="h-5 w-full mb-2" />
              <SkeletonBase className="h-4 w-3/4 mb-2" />
              <SkeletonBase className="h-6 w-20 mb-3" />
              <SkeletonBase className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePageSkeleton;