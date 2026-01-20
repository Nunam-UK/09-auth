'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const result = await checkSession();
        
        if (result.success && result.user) {
          setUser(result.user);
        } else {
          clearIsAuthenticated();
          if (pathname.includes('/notes') || pathname.includes('/profile')) {
            router.push('/sign-in');
          }
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isLoading) return <div>Loading session...</div>;

  return <>{children}</>;
};