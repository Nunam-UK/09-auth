import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers'; 
import { checkSessionServer } from '@/lib/api/serverApi';

const PRIVATE_ROUTES = ['/notes', '/profile'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  if (accessToken) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/notes/filter/all', request.url));
    }
    return NextResponse.next();
  }

  if (!accessToken && refreshToken) {
    try {
      const apiResponse = await checkSessionServer();
      const targetUrl = isAuthRoute 
        ? new URL('/notes/filter/all', request.url) 
        : request.url;

      const nextResponse = NextResponse.redirect(targetUrl);
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
    }
  }

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up'],
};