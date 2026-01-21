'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Це потрібно для коректного оновлення станів при переході між auth сторінками на Vercel
    router.refresh();
  }, [router]);

  return <>{children}</>;
}