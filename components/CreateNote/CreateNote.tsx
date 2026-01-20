'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import css from './CreateNote.module.css';

export const CreateNote = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setTitle('');
      setContent('');
      setTag('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        placeholder="Content" 
        required 
      />
      <input 
        value={tag} 
        onChange={e => setTag(e.target.value)} 
        placeholder="Tag (e.g. Work)" 
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Add Note'}
      </button>
    </form>
  );
};