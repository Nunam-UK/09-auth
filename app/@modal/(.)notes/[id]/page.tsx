import NotePreviewClient from './NotePreview.client';

export default async function NoteModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <NotePreviewClient id={id} />;
}