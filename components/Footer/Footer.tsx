import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <p>Built with Next.js for GoIT</p>
      </div>
    </footer>
  );
}