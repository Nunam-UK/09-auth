'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation'; 
import Link from 'next/link';
import { fetchNotes, deleteNote } from '@/lib/api/clientApi'; 
import type { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from '@/hooks/useDebounce';
import css from './Notes.module.css';

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function NotesPage({ forcedTag }: { forcedTag?: string }) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const tagFilter = forcedTag || searchParams.get('tag') || ''; 
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading } = useQuery<NotesResponse>({
    queryKey: ['notes', tagFilter, debouncedSearch, currentPage],
    queryFn: () => fetchNotes({ 
      tag: tagFilter || undefined, 
      search: debouncedSearch || undefined,
      page: currentPage 
    }) as Promise<NotesResponse>, 
    placeholderData: (prev) => prev, 
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <main className={css.mainContent}>
      <div className={css.headerSection}>
        <h1>{tagFilter ? `Notes: ${tagFilter}` : 'All My Notes'}</h1>
        <div className={css.actionsWrapper}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          <Link href="/notes/action/create" className={css.createBtn}>
            Create note +
          </Link>
        </div>
      </div>

      <div className={css.notesGrid}>
        {notes.length > 0 ? (
          notes.map((note: Note) => (
            <Link href={`/notes/${note.id}`} key={note.id} className={css.noteLink}>
              <div className={css.noteCard}>
                <div className={css.noteHeader}>
                  <h3>{note.title}</h3>
                </div>
                <p>{note.content}</p>
                <div className={css.noteFooter}>
                  <span className={css.tagBadge}>{note.tag}</span>
                  <button 
                    className={css.deleteBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteMutation.mutate(note.id);
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          !isLoading && <div className={css.emptyState}>No notes found.</div>
        )}
      </div>
      {totalPages > 1 && (
        <div className={css.pagination}>
          <button 
            className={css.pageBtn}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className={css.pageInfo}>
            Page <strong>{currentPage}</strong> of {totalPages}
          </span>
          <button 
            className={css.pageBtn}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}