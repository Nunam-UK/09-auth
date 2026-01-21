import Sidebar from '@/components/Sidebar/Sidebar';
import css from './NotesLayout.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode; 
}

export default function NotesLayout({ children, modal }: NotesLayoutProps) {
  return (
    <div className={css.layoutWrapper}>
      <Sidebar />
      <section className={css.content}>
        {children}
      </section>
      {modal}
    </div>
  );
}