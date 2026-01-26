
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSessionServer } from '@/lib/api/serverApi';

const PRIVATE_ROUTES = ['/notes', '/profile'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  try {
    const apiResponse = await checkSessionServer();
    
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/notes/filter/all', request.url));
    }

    const nextResponse = NextResponse.next();

    const setCookieHeader = apiResponse?.headers['set-cookie'];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookie: string) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    return nextResponse;

  } catch {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};