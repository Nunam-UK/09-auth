import { instance } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note'; 

interface FetchNotesParams {
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

export const register = async (data: Record<string, unknown>): Promise<User> => {
  const res = await instance.post('/auth/register', data);
  return res.data;
};

export const login = async (data: Record<string, unknown>): Promise<User> => {
  const res = await instance.post('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await instance.post('/auth/logout');
};

export const checkSession = async (): Promise<{ success: boolean; user: User | null }> => {
  try {
    const res = await instance.get('/auth/session');
    return { success: !!res.data, user: res.data || null };
  } catch {
    return { success: false, user: null };
  }
};


export const getMe = async (): Promise<User> => {
  const res = await instance.get('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const res = await instance.patch('/users/me', data);
  return res.data;
};


export const fetchNotes = async (params: FetchNotesParams = {}) => {
  const res = await instance.get('/notes', { 
    params: { ...params, perPage: 12 } 
  });
  // Повертаємо об'єкт з нотатками та кількістю сторінок
  return res.data; 
};

export const createNote = async (data: { title: string; content: string; tag: string }): Promise<Note> => {
  const res = await instance.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await instance.delete(`/notes/${id}`);
  return res.data;
};