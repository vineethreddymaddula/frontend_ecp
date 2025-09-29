'use client';

import SkeletonBase from './SkeletonBase';

const ProfilePageSkeleton = () => {
  return (
    <div className="bg-white dark:bg-primary-900 min-h-screen">
      {/* Profile Header Skeleton */}
      <div className="bg-white dark:bg-primary-800 border-b border-primary-200 dark:border-primary-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <SkeletonBase className="w-20 h-20 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonBase className="h-8 w-48" />
              <SkeletonBase className="h-4 w-64" />
              <SkeletonBase className="h-6 w-20 rounded-full" />
            </div>
            <SkeletonBase className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Account Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Details Skeleton */}
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700">
              <div className="p-6 border-b border-primary-200 dark:border-primary-700">
                <SkeletonBase className="h-6 w-40" />
              </div>
              <div className="p-6 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="space-y-2">
                      <SkeletonBase className="h-5 w-24" />
                      <SkeletonBase className="h-4 w-48" />
                    </div>
                    {i === 2 && <SkeletonBase className="h-6 w-12" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Skeleton */}
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <SkeletonBase className="w-10 h-10 rounded-full" />
                  <SkeletonBase className="h-6 w-40" />
                </div>
                <SkeletonBase className="w-5 h-5" />
              </div>
              
              <div className="border-t border-primary-200 dark:border-primary-700 divide-y divide-primary-100 dark:divide-primary-700">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <SkeletonBase className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <SkeletonBase className="h-5 w-32" />
                      <SkeletonBase className="h-4 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700 p-6">
              <SkeletonBase className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <SkeletonBase className="h-4 w-20" />
                    <SkeletonBase className="h-6 w-8" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700 p-6">
              <SkeletonBase className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <SkeletonBase key={i} className="h-10 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;