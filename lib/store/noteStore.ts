import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NoteState {
  notes: Note[];
  draftNote: { title: string; content: string; tag: string };
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  setDraftNote: (draft: Partial<NoteState['draftNote']>) => void;
  resetDraftNote: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      draftNote: { title: '', content: '', tag: 'Personal' },
      
      setNotes: (notes) => set({ notes }),
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      deleteNote: (id) => set((state) => ({ 
        notes: state.notes.filter((note) => note.id !== id) 
      })),

      setDraftNote: (draft) => set((state) => ({ 
        draftNote: { ...state.draftNote, ...draft } 
      })),
      
      resetDraftNote: () => set({ 
        draftNote: { title: '', content: '', tag: 'Personal' } 
      }),
    }),
    {
      name: 'note-draft-storage', 
      partialize: (state) => ({ draftNote: state.draftNote }),
    }
  )
);