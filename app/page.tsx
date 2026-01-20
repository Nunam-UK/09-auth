import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.mainContent}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      
      <div className={css.heroText}>
        <p>
          NoteHub is a simple and efficient application designed for managing personal notes. 
          It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.
        </p>
        <p>
          The app provides a clean interface for writing, editing, and browsing notes. 
          With support for keyword search and structured organization, NoteHub offers a 
          streamlined experience for anyone who values clarity and productivity.
        </p>
      </div>

      <footer className={css.footer}>
        <p>© 2025 NoteHub. All rights reserved.</p>
        <div className={css.contacts}>
          <span>Developer: Volodka</span>
          <span>Contact us: <a href="mailto:student@notehub.app">student@notehub.app</a></span>
        </div>
      </footer>
    </main>
  );
}