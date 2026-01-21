import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        
        <nav className={css.nav}>
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link href="/" className={css.navigationLink}>Home</Link>
            </li>
            <li className={css.navigationItem}>
              <Link href="/notes/filter/all" className={css.navigationLink}>My Notes</Link>
            </li>
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}