'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation'; 
import Link from 'next/link';
import { fetchNotes, deleteNote } from '@/lib/api/clientApi'; 
import type { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from '@/hooks/useDebounce'; 
import css from './CreateNotePage.module.css';

export default function NotesPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const tagFilter = searchParams.get('tag') || ''; 
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: notes, isLoading, } = useQuery<Note[]>({
 
    queryKey: ['notes', tagFilter, debouncedSearch],
    queryFn: () => fetchNotes({ 
      tag: tagFilter || undefined, 
      search: debouncedSearch || undefined 
    }),
    retry: false,
    placeholderData: (previousData) => previousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <main className={css.mainContent}>
      <div className={css.headerSection}>
        <h1>{tagFilter ? `Notes: ${tagFilter}` : 'All My Notes'}</h1>
        
        <div className={css.actionsWrapper}>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
          <Link href="/notes/create" className={css.createBtn}>
            Create note +
          </Link>
        </div>
      </div>

      <div className={css.notesGrid}>
        {isLoading && !notes && <p>Searching...</p>}
        
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note: Note) => ( 
            <div key={note.id} className={css.noteCard}>
              <div className={css.noteHeader}>
                <h3>{note.title}</h3>
              </div>
              <p>{note.content}</p>
              <div className={css.noteFooter}>
                <span className={css.tagBadge}>{note.tag}</span>
                <button 
                  className={css.deleteBtn}
                  onClick={() => deleteMutation.mutate(note.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          !isLoading && (
            <div className={css.emptyState}>
              <p>No notes found.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}