
import { cookies } from 'next/headers';
import { instance } from './api';
import { AxiosResponse } from 'axios';
import { NoteData } from '@/types/note';
import { User } from '@/types/user' 

const getServerHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const fetchNoteByIdServer = async (id: string): Promise<NoteData> => {
  const headers = await getServerHeaders();
  const { data } = await instance.get<NoteData>(`/notes/${id}`, headers);
  return data;
};

export const fetchAllNotesServer = async (): Promise<NoteData[]> => {
  const headers = await getServerHeaders();
  const { data } = await instance.get<NoteData[]>('/notes', headers);
  return data;
};

export const getMeServer = async (): Promise<User> => {
  const headers = await getServerHeaders();
  const { data } = await instance.get<User>('/users/me', headers);
  return data;
};

export const checkSessionServer = async (): Promise<AxiosResponse> => {
  const headers = await getServerHeaders();
  return await instance.get('/auth/session', headers);
};