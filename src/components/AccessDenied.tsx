import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900 flex flex-col items-center justify-center text-center mobile-container">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 dark:text-primary-100 mb-2">Access Denied</h1>
      <p className="text-primary-600 dark:text-primary-400 mb-6 sm:mb-8 text-sm sm:text-base px-4">You do not have the necessary permissions to view this page.</p>
      <Link href="/" className="bg-accent text-white font-bold py-3 px-6 rounded-xl hover:bg-accent-hover transition-colors duration-300 btn-touch">
        Go to Homepage
      </Link>
    </div>
  );
}