'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Link from 'next/link';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <div className={css.loader}>Loading note details...</div>;
  }

  if (isError || !note) {
    return (
      <div className={css.errorContainer}>
        <p>Could not load note details.</p>
        <Link href="/notes/filter/all">Back to list</Link>
      </div>
    );
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.nav}>
          <Link href="/notes/filter/all" className={css.backBtn}>
            ← Back to Notes
          </Link>
        </div>
        
        <article className={css.card}>
          <header className={css.header}>
            <h1 className={css.title}>{note.title}</h1>
            <span className={css.tag}>{note.tag}</span>
          </header>
          
          <div className={css.content}>
            {note.content}
          </div>
          
          <footer className={css.footer}>
            <Link href={`/notes/action/edit/${id}`} className={css.editBtn}>
              Edit Note
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}