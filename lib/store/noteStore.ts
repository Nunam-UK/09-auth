import { create } from 'zustand';
import { Note } from '@/types/note';

interface NoteState {
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  selectedNote: null,
  setSelectedNote: (note) => set({ selectedNote: note }),
}));