import { instance } from './api';
import { User } from '@/types/user';
import { NoteData } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse, CreateNotePayload } from '@/types/api';

// Auth
export const register = async (data: Pick<User, 'email'> & { password: string }) => {
  const { data: response } = await instance.post<User>('/auth/register', data);
  return response;
};

export const login = async (data: Pick<User, 'email'> & { password: string }) => {
  const { data: response } = await instance.post<User>('/auth/login', data);
  return response;
};

export const logout = async (): Promise<void> => {
  await instance.post('/auth/logout');
};

export const checkSession = async (): Promise<User> => {
  const { data } = await instance.get<User>('/auth/session');
  return data;
};

// Users
export const getMe = async (): Promise<User> => {
  const { data } = await instance.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const { data: response } = await instance.patch<User>('/users/me', data);
  return response;
};

// Notes
export const fetchNotes = async ({ page, perPage, search, tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: { 
      page, 
      perPage, 
      search: search?.trim() || undefined, 
      tag: tag === 'all' ? undefined : tag 
    }
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<NoteData> => {
  const { data } = await instance.get<NoteData>(`/notes/${id}`);
  return data;
};

export const createNote = async (data: CreateNotePayload): Promise<NoteData> => {
  const { data: response } = await instance.post<NoteData>('/notes', data);
  return response;
};

export const updateNote = async (id: string, data: Partial<CreateNotePayload>): Promise<NoteData> => {
  const { data: response } = await instance.patch<NoteData>(`/notes/${id}`, data);
  return response;
};

export const deleteNote = async (id: string) => {
  const response = await instance.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` 
    }
  });
  return response.data;
};