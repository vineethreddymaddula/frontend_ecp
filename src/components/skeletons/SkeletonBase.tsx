'use client';

interface SkeletonBaseProps {
  className?: string;
  animate?: boolean;
}

const SkeletonBase = ({ className = '', animate = true }: SkeletonBaseProps) => {
  return (
    <div 
      className={`bg-primary-200 dark:bg-primary-700 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
    />
  );
};

export default SkeletonBase;