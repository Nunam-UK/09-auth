import Link from 'next/link';
import css from './HomePage.module.css'; 

export default function Home() {
  return (
    <main className={css.mainContent}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      
      <div className={css.heroText}>
        <p>
          NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/notes/filter/all" className={css.title} style={{ fontSize: '24px', textDecoration: 'underline' }}>
          Open My Notes →
        </Link>
      </div>

    </main>
  );
}