'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const result = await checkSession();
        
        if (result.success && result.user) {
          const fullUserData = await getMe(); 
          setUser(fullUserData); 
        } else {
          clearIsAuthenticated();
          if (pathname.includes('/notes') || pathname.includes('/profile')) {
            router.push('/sign-in');
          }
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsInitialLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isInitialLoading) return <div className="loader">Loading session...</div>;

  return <>{children}</>;
};