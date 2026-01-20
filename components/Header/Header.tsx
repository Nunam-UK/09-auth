'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './Header.module.css';

export const Header = () => {
  const { user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>NoteHub</Link>
      
      <nav className={css.nav}>
        <Link href="/" className={css.navLink}>Home</Link>
        
        {user ? (
          <>
            <div className={css.dropdown}>
              <button className={css.dropbtn}>Notes ▼</button>
              <div className={css.dropdownContent}>
                <Link href="/notes">All Notes</Link>
                <Link href="/notes?tag=Work">Work</Link>
                              <Link href="/notes?tag=Personal">Personal</Link>
                              <Link href="/notes?tag=Shopping">Shopping</Link>
                              <Link href="/notes?tag=Todo">Todo</Link>
                              <Link href="/notes?tag=Meeting">Meeting</Link>
              </div>
            </div>
            <Link href="/profile" className={css.navLink}>Profile</Link>
            <button onClick={handleLogout} className={css.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/sign-in" className={css.navLink}>Login</Link>
            <Link href="/sign-up" className={css.signUpBtn}>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

