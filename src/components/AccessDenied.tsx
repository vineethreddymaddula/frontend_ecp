import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <h1 className="text-4xl font-bold text-primary mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-8">You do not have the necessary permissions to view this page.</p>
      <Link href="/" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors duration-300">
        Go to Homepage
      </Link>
    </div>
  );
}