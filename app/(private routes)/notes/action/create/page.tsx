import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNotePage() {
  return (
    <main style={{ padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Create New Note</h1>
      <NoteForm/>
    </main>
  );
}