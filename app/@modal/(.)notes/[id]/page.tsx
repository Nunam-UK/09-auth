// 'use client';

// import { use } from 'react';
// import { useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api/clientApi';
// import css from './Modal.module.css';

// export default function NoteModal({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params);
//   const router = useRouter();

//   const { data: note } = useQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//   });

//   return (
//     <div className={css.backdrop} onClick={() => router.back()}>
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         <button className={css.closeBtn} onClick={() => router.back()}>×</button>
//         {note ? (
//           <>
//             <h2>{note.title}</h2>
//             <p>{note.content}</p>
//           </>
//         ) : <p>Loading...</p>}
//       </div>
//     </div>
//   );
// }

import { getNoteServer } from '@/lib/api/serverApi';
import NotePreviewClient from './NotePreview.client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await getNoteServer(id);

  return <NotePreviewClient note={note} />;
}