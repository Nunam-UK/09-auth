import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Отримуємо токени
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 2. Визначаємо типи маршрутів
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  
  // Якщо користувач намагається зайти на приватну сторінку БЕЗ токенів
  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Якщо користувач ВЖЕ авторизований і намагається зайти на сторінку входу/реєстрації
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/profile', request.url));
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