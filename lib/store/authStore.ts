import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
    clearIsAuthenticated: () => void;
    draftNote: { title: string; content: string; tag: string } | null;
  setDraftNote: (note: { title: string; content: string; tag: string } | null) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
    clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  draftNote: null,
  setDraftNote: (draftNote) => set({ draftNote }),
}));