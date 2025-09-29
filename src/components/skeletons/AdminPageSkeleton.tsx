'use client';

import SkeletonBase from './SkeletonBase';

const AdminPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="app-container app-padding py-4">
        {/* Header Skeleton */}
        <div className="mb-6">
          <SkeletonBase className="h-8 w-48 mb-2" />
          <SkeletonBase className="h-4 w-64" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="app-card">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <SkeletonBase className="h-4 w-20" />
                  <SkeletonBase className="h-8 w-16" />
                </div>
                <SkeletonBase className="w-12 h-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-6">
          <div className="flex gap-4 border-b border-primary-200 dark:border-primary-700">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBase key={i} className="h-10 w-24 rounded-t-lg" />
            ))}
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="app-card">
          {/* Action Bar Skeleton */}
          <div className="flex justify-between items-center mb-4">
            <SkeletonBase className="h-6 w-32" />
            <SkeletonBase className="h-10 w-32 rounded-lg" />
          </div>

          {/* Table/List Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-primary-200 dark:border-primary-700 rounded-lg">
                <SkeletonBase className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <SkeletonBase className="h-5 w-full" />
                  <SkeletonBase className="h-4 w-3/4" />
                  <SkeletonBase className="h-4 w-1/2" />
                </div>
                <div className="flex gap-2">
                  <SkeletonBase className="w-8 h-8 rounded" />
                  <SkeletonBase className="w-8 h-8 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageSkeleton;