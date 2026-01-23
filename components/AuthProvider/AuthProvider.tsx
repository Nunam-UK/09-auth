'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkSession();
        const userData = await getMe();
        
        setUser(userData);
      } catch { 
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return <>{children}</>;
}