'use client';

import SkeletonBase from './SkeletonBase';

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="app-container app-padding py-4">
        {/* Product Image Skeleton */}
        <div className="relative mb-4">
          <SkeletonBase className="aspect-square w-full rounded-xl" />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <SkeletonBase className="w-2 h-2 rounded-full" />
            <SkeletonBase className="w-2 h-2 rounded-full" />
            <SkeletonBase className="w-2 h-2 rounded-full" />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="app-card mb-4">
          <SkeletonBase className="h-6 w-20 rounded-full mb-2" />
          <SkeletonBase className="h-8 w-full mb-2" />
          <SkeletonBase className="h-6 w-3/4 mb-3" />
          
          {/* Rating Skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBase key={i} className="w-4 h-4 rounded-sm" />
              ))}
            </div>
            <SkeletonBase className="h-4 w-24" />
          </div>

          <SkeletonBase className="h-16 w-full mb-4" />

          {/* Price Skeleton */}
          <div className="flex items-center gap-3 mb-3">
            <SkeletonBase className="h-8 w-20" />
            <SkeletonBase className="h-6 w-16" />
            <SkeletonBase className="h-6 w-16 rounded-full" />
          </div>

          {/* Stock Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <SkeletonBase className="w-2 h-2 rounded-full" />
            <SkeletonBase className="h-4 w-24" />
          </div>
        </div>

        {/* Quantity & Actions Skeleton */}
        <div className="app-card mb-4">
          <div className="flex items-center justify-between mb-4">
            <SkeletonBase className="h-5 w-16" />
            <SkeletonBase className="h-10 w-24 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <SkeletonBase className="flex-1 h-12 rounded-xl" />
            <SkeletonBase className="w-12 h-12 rounded-xl" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="app-card">
          <SkeletonBase className="h-5 w-32 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBase className="w-4 h-4 rounded-sm" />
                <SkeletonBase className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;