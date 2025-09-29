'use client';

import SkeletonBase from './SkeletonBase';

const OrdersPageSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="mb-4 sm:mb-6 border-b border-primary-200 dark:border-primary-600 pb-4">
        <SkeletonBase className="h-8 w-32" />
      </div>

      {/* Orders List Skeleton */}
      <div className="space-y-4 sm:space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700 p-4 sm:p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div className="space-y-2">
                <SkeletonBase className="h-5 w-32" />
                <SkeletonBase className="h-4 w-24" />
              </div>
              <SkeletonBase className="h-6 w-20 rounded-full" />
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-700 rounded-lg">
                  <SkeletonBase className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBase className="h-4 w-full" />
                    <SkeletonBase className="h-3 w-20" />
                  </div>
                  <SkeletonBase className="h-4 w-16" />
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-primary-200 dark:border-primary-600">
              <div className="space-y-1">
                <SkeletonBase className="h-4 w-24" />
                <SkeletonBase className="h-3 w-32" />
              </div>
              <div className="flex gap-2">
                <SkeletonBase className="h-8 w-20 rounded-lg" />
                <SkeletonBase className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPageSkeleton;