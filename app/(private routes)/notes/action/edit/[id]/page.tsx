import NoteForm from '@/components/NoteForm/NoteForm';

export default function EditNotePage() {
  return (
    <main style={{ padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Editing is disabled
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Editing notes is not supported. You can create a new note below.
      </p>
      <NoteForm />
    </main>
  );
}