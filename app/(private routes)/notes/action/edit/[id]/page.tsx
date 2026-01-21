import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);

  return (
    <main style={{ padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Edit Note</h1>
      <NoteForm mode="edit" initialData={note} />
    </main>
  );
}