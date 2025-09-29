'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary', 
  text, 
  fullScreen = false 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-primary-500 dark:text-primary-400',
    secondary: 'text-secondary-500 dark:text-secondary-400',
    white: 'text-white'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} ${colorClasses[variant]} animate-spin`}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 20"
              className="opacity-75"
            />
          </svg>
        </div>
        
        {/* Inner dot */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className={`w-2 h-2 ${variant === 'white' ? 'bg-white' : 'bg-primary-500 dark:bg-primary-400'} rounded-full animate-pulse`} />
        </div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} ${colorClasses[variant]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-primary-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-scale-in mx-4">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;