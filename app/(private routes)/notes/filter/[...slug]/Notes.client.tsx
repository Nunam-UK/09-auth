'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import css from './NotesClient.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({ initialFilter }: { initialFilter: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFilterPage = pathname.includes('/notes/filter/');
  const isNoteModalOpen = pathname.includes('/notes/') && !isFilterPage && !pathname.includes('/action/');
  const activeTag = useMemo(() => {
    if (isFilterPage) {
      return pathname.split('/').pop() || initialFilter;
    }
    return initialFilter;
  }, [pathname, isFilterPage, initialFilter]);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch] = useDebounce(search, 500);
  const page = Number(searchParams.get('page')) || 1;
  const updateUrl = useCallback((newParams: { page?: number; search?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newParams.search !== undefined) {
      if (newParams.search) {
        params.set('search', newParams.search);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
    }

    if (newParams.page !== undefined) {
      params.set('page', newParams.page.toString());
    }

    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (newQueryString !== currentQueryString) {
      router.push(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const searchInUrl = searchParams.get('search') || '';
    if (debouncedSearch !== searchInUrl) {
      updateUrl({ search: debouncedSearch });
    }
  }, [debouncedSearch, updateUrl, searchParams]);

  const { data, isLoading, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', activeTag, debouncedSearch, page],
    queryFn: async () => {
      const formattedTag = activeTag === 'all' 
        ? '' 
        : activeTag.charAt(0).toUpperCase() + activeTag.slice(1);

      return fetchNotes({ 
        tag: formattedTag, 
        search: debouncedSearch, 
        page, 
        perPage: 6 
      });
    },
    placeholderData: (previousData) => previousData,
    enabled: isFilterPage || isNoteModalOpen,
  });

  const showLoader = isLoading || (isFetching && !data);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create" className={css.button}>+ New Note</Link>
      </div>

      {showLoader ? (
        <p className={css.loader}>Loading notes...</p>
      ) : (data?.notes && data.notes.length > 0) || isNoteModalOpen ? (
        <div className={isNoteModalOpen ? css.backgroundBlur : ''}>
          <NoteList notes={data?.notes || []} />
          <Pagination 
            current={page} 
            total={data?.totalPages || 1} 
            onChange={(p) => updateUrl({ page: p })} 
          />
        </div>
      ) : (
        isFilterPage && (
          <div className={css.emptyState}>
            <div className={css.emptyIcon}>📝</div>
            <p className={css.emptyText}>
              {debouncedSearch 
                ? `No notes found matching "${debouncedSearch}"` 
                : `You don't have any notes in the "${activeTag}" category yet.`}
            </p>
            <Link href="/notes/action/create" className={css.createLink}>
              Create your first note
            </Link>
          </div>
        )
      )}
    </div>
  );
}