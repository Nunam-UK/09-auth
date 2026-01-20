'use client';
import { Modal } from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';

export default function NotePreviewClient({ note }: { note: Note }) {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <small>Category: {note.tag}</small>
    </Modal>
  );
}