// 'use client';

// import { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { createNote } from '@/lib/api/clientApi';
// import css from './CreateNotePage.module.css';

// export default function CreateNotePage() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
  
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tag, setTag] = useState('Work');

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       // Оновлюємо кеш, щоб нова нотатка з'явилася в списку
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//       // Повертаємо користувача на головну сторінку нотаток
//       router.push('/notes');
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     mutation.mutate({ title, content, tag });
//   };

//   return (
//     <main className={css.container}>
//       <h1 className={css.title}>Create New Note</h1>
//       <form onSubmit={handleSubmit} className={css.form}>
//         <div className={css.field}>
//           <label>Title</label>
//           <input
//             className={css.input}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className={css.field}>
//           <label>Content</label>
//           <textarea
//             className={css.textarea}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </div>
//         <div className={css.field}>
//           <label>Tag</label>
//           <select className={css.select} value={tag} onChange={(e) => setTag(e.target.value)}>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Todo">Todo</option>
//           </select>
//         </div>
//         <div className={css.actions}>
//           <button type="button" onClick={() => router.back()} className={css.cancelBtn}>
//             Cancel
//           </button>
//           <button type="submit" className={css.submitBtn} disabled={mutation.isPending}>
//             {mutation.isPending ? 'Saving...' : 'Create Note'}
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// }

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