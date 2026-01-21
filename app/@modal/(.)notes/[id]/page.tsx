import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/(private routes)/notes/[id]/NoteDetails.client';

export default async function NoteModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Modal>
      {/* Використовуємо той самий клієнтський компонент деталей */}
      <NoteDetailsClient id={id} />
    </Modal>
  );
}