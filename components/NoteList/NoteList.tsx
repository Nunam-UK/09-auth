import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const NoteList = ({ notes, onDelete, isDeleting }: NoteListProps) => {
  return (
    <div className={css.notesGrid}>
      {notes.map((note) => (
        <Link href={`/notes/${note.id}`} key={note.id} className={css.noteLink}>
          <div className={css.noteCard}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className={css.noteFooter}>
              <span className={css.tagBadge}>{note.tag}</span>
              <button 
                className={css.deleteBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};