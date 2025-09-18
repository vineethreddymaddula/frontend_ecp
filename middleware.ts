import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This log helps confirm the middleware is running
  console.log(`MIDDLEWARE RUNNING FOR PATH: ${request.nextUrl.pathname}`);

  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth_token')?.value;

  // --- THE FIX: Ensure '/checkout' is in this list ---
  const protectedPaths = ['/profile', '/admin', '/checkout'];
  const authPaths = ['/login', '/register'];

  // If a logged-in user tries to access login/register, redirect them to the home page
  if (token && authPaths.some(p => path.startsWith(p))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If a guest tries to access a protected path, redirect them to the login page
  if (!token && protectedPaths.some(p => path.startsWith(p))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path); // This sends them back to checkout after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};