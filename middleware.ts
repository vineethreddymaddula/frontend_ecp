import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth_token')?.value;

  // Define paths that require authentication
  const protectedPaths = ['/', '/cart', '/checkout', '/admin'];

  // Define paths for authentication (login, register)
  const authPaths = ['/login', '/register'];

  // If the user has a token and tries to access login/register, redirect to home
  if (token && authPaths.some(p => path.startsWith(p))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user does not have a token and is trying to access a protected path, redirect to login
  if (!token && protectedPaths.some(p => path.startsWith(p))) {
    // Add a query param to redirect back to the intended page after login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};