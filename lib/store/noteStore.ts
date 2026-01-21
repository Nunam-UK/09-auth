import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NoteState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  deleteNote: (id) => set((state) => ({ 
    notes: state.notes.filter((note) => note.id !== id) 
  })),
}));