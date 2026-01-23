

'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, updateNote } from '@/lib/api/clientApi'; 
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'];

interface NoteFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    id: string;
    title: string;
    content: string;
    tag: string;
  };
}

export default function NoteForm({ mode, initialData }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draftNote, setDraftNote, resetDraftNote } = useNoteStore();
  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string; tag: string }) => {
      return mode === 'edit' && initialData
        ? updateNote(initialData.id, data)
        : createNote(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      resetDraftNote();
      router.push('/notes/filter/all');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraftNote({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draftNote);
  };

  return (
    <div className={css.pageWrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.title}>
          {mode === 'create' ? 'Create New Note' : 'Edit Note'}
        </h1>

        <div className={css.field}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={draftNote.title}
            onChange={handleChange}
            placeholder="Enter title..."
            required
          />
        </div>

        <div className={css.field}>
          <label htmlFor="tag">Category</label>
          <select id="tag" name="tag" value={draftNote.tag} onChange={handleChange}>
            {TAGS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className={css.field}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={draftNote.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            rows={5}
            required
          />
        </div>

        <div className={css.actions}>
          <button 
            type="button" 
            className={css.cancelBtn} 
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitBtn} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : mode === 'create' ? 'Create Note' : 'Save Changes'}
          </button>
        </div>
        {mutation.isError && <p className={css.error}>Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}