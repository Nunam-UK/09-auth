'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createNote, updateNote } from '@/lib/api/clientApi'; 
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
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [text, setText] = useState(initialData?.content || '');
  const [tag, setTag] = useState(initialData?.tag || 'Personal');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'edit' && initialData) {
       
        await updateNote(initialData.id, { title, content: text, tag });
      } else {
       
        await createNote({ title, content: text, tag });
      }
      
      router.push('/notes/filter/all');
      router.refresh(); 
    } catch (error) {
      console.error('Operation failed:', error);
    } finally {
      setIsLoading(false);
    }
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
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            required
          />
        </div>

        <div className={css.field}>
          <label htmlFor="tag">Category</label>
          <select id="tag" value={tag} onChange={(e) => setTag(e.target.value)}>
            {TAGS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className={css.field}>
          <label htmlFor="text">Content</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your note here..."
            rows={5}
            required
          />
        </div>

        <div className={css.actions}>
          <Link href="/notes/filter/all" className={css.cancelBtn}>
            Cancel
          </Link>
          <button type="submit" className={css.submitBtn} disabled={isLoading}>
            {isLoading ? 'Saving...' : mode === 'create' ? 'Create Note' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}