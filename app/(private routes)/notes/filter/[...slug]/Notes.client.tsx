'use client';
import NotesPage from '../../page';

export default function NotesClient({ tag }: { tag: string }) {
  return <NotesPage forcedTag={tag} />;
}