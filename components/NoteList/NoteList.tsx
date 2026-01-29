'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { deleteNote } from '@/lib/api/clientApi'; 
import css from './NoteList.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete note. Please try again.');
    },
  });

  const confirmDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      handleDelete(id);
    }
  };

  return (
    <div className={css.grid}>
      {notes.map((note) => (
        <div key={note.id} className={css.card}>
          <div className={css.cardHeader}>
            <h3 className={css.title}>{note.title}</h3>
            <span className={css.tagBadge}>{note.tag}</span>
          </div>
          <p className={css.excerpt}>
            {note.content.length > 100 
              ? `${note.content.substring(0, 100)}...` 
              : note.content}
          </p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.viewBtn} scroll={false}>
              View
            </Link>
            
            <button 
              className={css.deleteBtn} 
              onClick={() => confirmDelete(note.id, note.title)}
              disabled={isPending}
            >
              {isPending ? '...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}