'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl focus:ring-primary-500 hover:scale-105 active:scale-95',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900 shadow-md hover:shadow-lg focus:ring-secondary-500 hover:scale-105 active:scale-95',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500 hover:scale-105 active:scale-95',
    ghost: 'text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-500 hover:scale-105 active:scale-95',
    danger: 'bg-error-500 hover:bg-error-600 text-white shadow-lg hover:shadow-xl focus:ring-error-500 hover:scale-105 active:scale-95',
    success: 'bg-success-500 hover:bg-success-600 text-white shadow-lg hover:shadow-xl focus:ring-success-500 hover:scale-105 active:scale-95'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner 
            size={size === 'sm' ? 'sm' : 'md'} 
            variant={variant === 'outline' || variant === 'ghost' ? 'primary' : 'white'} 
          />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className={`${iconSizeClasses[size]} mr-2 flex-shrink-0`}>
              {leftIcon}
            </span>
          )}
          <span className="flex-1">{children}</span>
          {rightIcon && (
            <span className={`${iconSizeClasses[size]} ml-2 flex-shrink-0`}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;