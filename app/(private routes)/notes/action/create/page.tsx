'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/clientApi';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import css from './CreateNotePage.module.css';

export default function CreateNotePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes'); // Повертаємось до списку після успіху
    },
  });

  return (
    <main className={css.mainContent}>
      <div className={css.container}>
        <h1 className={css.title}>Create New Note</h1>
        <NoteForm 
          onSubmit={(data) => mutation.mutate(data)} 
          isLoading={mutation.isPending} 
        />
      </div>
    </main>
  );
}