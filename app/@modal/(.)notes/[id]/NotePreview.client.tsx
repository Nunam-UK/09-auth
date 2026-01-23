'use client';

import { useRouter } from 'next/navigation'; 
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    staleTime: 1000 * 60 * 5,
  });

  const handleClose = () => {
    router.back();
  };

  
  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.loaderWrapper}>
          <p>Loading note details...</p>
        </div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.errorWrapper}>
          <p>Failed to load note. It might have been deleted.</p>
          <button onClick={handleClose} className={css.closeBtn}>Go back</button>
        </div>
      </Modal>
    );
  }

  return (
   
    <Modal onClose={handleClose}>
      <div className={css.previewContent}>
        <div className={css.modalHeader}>
          <h2 className={css.title}>{note.title}</h2>
          
        </div>

        <div className={css.badgeWrapper}>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.body}>
          <p className={css.contentText}>{note.content}</p>
        </div>

      </div>
    </Modal>
  );
}