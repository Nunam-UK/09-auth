'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import css from './NotePage.module.css';

export default function NoteDetailedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <main className={css.container}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>Tag: {note.tag}</span>
    </main>
  );
}