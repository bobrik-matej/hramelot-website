import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMemberRoute = pathname.startsWith('/members');
  const isAdminRoute = pathname.startsWith('/admin');

  // 1. Public routes pass through
  if (!isMemberRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // 2. Check authentication
  const session = await auth();

  if (!session) {
    const loginUrl = new URL('/api/auth/signin', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = session.user.role;

  // 3. ADMIN routes: Only ADMIN role allowed
  if (isAdminRoute && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/members', request.url));
  }

  // 4. MASTER+ routes (Organize): MASTER or ADMIN required
  if (pathname.startsWith('/members/organize')) {
    if (!['MASTER', 'ADMIN'].includes(userRole)) {
      return NextResponse.redirect(new URL('/members', request.url));
    }
  }

  // 5. MEMBER+ routes (Reservations): MEMBER, MASTER, or ADMIN required
  if (pathname.startsWith('/members/reservations')) {
    if (!['MEMBER', 'MASTER', 'ADMIN'].includes(userRole)) {
      // If they are just a USER, redirect to join/upgrade info
      return NextResponse.redirect(new URL('/join', request.url));
    }
  }

  return NextResponse.next();
}

// Optimization: Only run middleware on these specific path patterns
export const config = {
  matcher: ['/members/:path*', '/admin/:path*'],
};
