'use client';

import SkeletonBase from './SkeletonBase';

const CheckoutPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="app-container app-padding py-4">
        {/* Header Skeleton */}
        <div className="text-center mb-6">
          <SkeletonBase className="h-8 w-48 mx-auto mb-2" />
          <SkeletonBase className="h-4 w-32 mx-auto" />
        </div>

        <div className="space-y-4">
          {/* Shipping Form Skeleton */}
          <div className="app-card">
            <SkeletonBase className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              <SkeletonBase className="h-12 w-full rounded-lg" />
              <SkeletonBase className="h-12 w-full rounded-lg" />
              <SkeletonBase className="h-12 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <SkeletonBase className="h-12 w-full rounded-lg" />
                <SkeletonBase className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="app-card">
            <SkeletonBase className="h-6 w-32 mb-4" />
            
            {/* Cart Items Preview Skeleton */}
            <div className="space-y-2 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-primary-50 dark:bg-primary-700 rounded-lg">
                  <SkeletonBase className="w-10 h-10 rounded-md" />
                  <div className="flex-1 space-y-1">
                    <SkeletonBase className="h-4 w-full" />
                    <SkeletonBase className="h-3 w-16" />
                  </div>
                  <SkeletonBase className="h-4 w-12" />
                </div>
              ))}
            </div>

            {/* Price Breakdown Skeleton */}
            <div className="space-y-2 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <SkeletonBase className="h-4 w-20" />
                  <SkeletonBase className="h-4 w-16" />
                </div>
              ))}
            </div>

            {/* Payment Methods Skeleton */}
            <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-600">
              <SkeletonBase className="h-5 w-32 mx-auto mb-3" />
              <div className="space-y-2">
                <SkeletonBase className="h-12 w-full rounded-xl" />
                <SkeletonBase className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;