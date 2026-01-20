'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation'; 
import Link from 'next/link';
import { fetchNotes, deleteNote } from '@/lib/api/clientApi'; 
import type { Note } from '@/types/note';
import { NoteList } from '@/components/NoteList/NoteList';
import { Pagination } from '@/components/Pagination/Pagination';
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
      {isLoading ? (
        <div className={css.loading}>Loading notes...</div>
      ) : (
        <NoteList 
          notes={notes} 
          onDelete={(id) => deleteMutation.mutate(id)} 
          isDeleting={deleteMutation.isPending} 
        />
      )}
      <Pagination 
        current={currentPage} 
        total={totalPages} 
        onChange={(page) => setCurrentPage(page)} 
      />
    </main>
  );
}