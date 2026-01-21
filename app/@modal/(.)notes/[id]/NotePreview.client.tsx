'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return null; 
  if (!note) return null;

  return (
    <Modal>
      <div className={css.previewContent}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
        <div className={css.body}>{note.content}</div>
      </div>
    </Modal>
  );
}