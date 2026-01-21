// lib/api/api.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const instance = axios.create({
  baseURL,
  withCredentials: true, // Обов'язково для передачі кук
});