'use client';
import { Note } from '@/types/note';
import css from './NotePage.module.css';

export default function NoteDetailsClient({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <span className={css.tag}>{note.tag}</span>
    </div>
  );
}