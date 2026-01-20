'use client';

import { useState } from 'react';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
  isLoading: boolean;
  initialData?: { title: string; content: string; tag: string };
}

export const NoteForm = ({ onSubmit, isLoading, initialData }: NoteFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tag, setTag] = useState(initialData?.tag || 'Work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          required
        />
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content..."
          required
        />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Category</label>
        <select id="tag" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Meeting">Meeting</option>
          <option value="Todo">Todo</option>
        </select>
      </div>

      <button type="submit" className={css.submitBtn} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Note'}
      </button>
    </form>
  );
};