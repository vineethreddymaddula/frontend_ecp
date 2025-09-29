'use client';

import SkeletonBase from './SkeletonBase';

const CartPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="mobile-container py-4">
        {/* Header Skeleton */}
        <div className="mb-4">
          <SkeletonBase className="h-8 w-40 mb-1" />
          <SkeletonBase className="h-4 w-48" />
        </div>

        {/* Cart Items Skeleton */}
        <div className="space-y-3 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-primary-800 app-card">
              <div className="flex items-center gap-3">
                <SkeletonBase className="w-16 h-16 rounded-lg flex-shrink-0" />
                
                <div className="flex-grow min-w-0 space-y-2">
                  <SkeletonBase className="h-5 w-full" />
                  <SkeletonBase className="h-4 w-20" />
                  <SkeletonBase className="h-5 w-16" />
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <SkeletonBase className="h-8 w-20 rounded-lg" />
                  <SkeletonBase className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-white dark:bg-primary-800 app-card">
          <SkeletonBase className="h-6 w-32 mb-3" />
          
          <div className="space-y-2 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <SkeletonBase className="h-4 w-24" />
                <SkeletonBase className="h-4 w-16" />
              </div>
            ))}
          </div>

          <SkeletonBase className="h-12 w-full rounded-lg mb-3" />
          <SkeletonBase className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;