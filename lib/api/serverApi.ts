
import { cookies } from 'next/headers';
import { instance } from './api';

const getServerHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const fetchNoteByIdServer = async (id: string) => {
  const headers = await getServerHeaders();
  const { data } = await instance.get(`/notes/${id}`, headers);
  return data;
};

export const getMeServer = async () => {
  const headers = await getServerHeaders();
  const { data } = await instance.get('/users/me', headers);
  return data;
};

export const checkSessionServer = async () => {
  const headers = await getServerHeaders();
  try {
    const response = await instance.get('/auth/session', headers);
    return response; 
  } catch {
    return null;
  }
};


export const refreshSession = async (refreshToken: string) => {
  try {
    const { data } = await instance.post('/auth/refresh', { refreshToken });
    return data; 
  } catch {
    return null;
  }
};