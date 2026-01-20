import { instance } from './api';

export const getNoteServer = async (id: string) => {
  const res = await fetch(`https://ac.goit.global/notes/${id}`, {
    cache: 'no-store', 
  });
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
};