
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshSession } from './lib/api/serverApi'; 

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  let isValidUser = !!accessToken;

  if (!accessToken && refreshToken) {
    try {
      const sessionData = await refreshSession(refreshToken);
      
      if (sessionData?.accessToken) {
        isValidUser = true;
        
        const response = NextResponse.next();
        
        response.cookies.set('accessToken', sessionData.accessToken, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' 
        });
        
        if (sessionData.refreshToken) {
          response.cookies.set('refreshToken', sessionData.refreshToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
          });
        }

        if (isAuthRoute) {
          return NextResponse.redirect(new URL('/', request.url));
        }
        
        return response;
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
      isValidUser = false;
    }
  }

  if (isPrivateRoute && !isValidUser) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && isValidUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/profile/:path*',
    '/notes',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};