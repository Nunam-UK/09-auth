import { Metadata } from 'next';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] || 'all';
  const title = `${filter.charAt(0).toUpperCase() + filter.slice(1)} Notes | NoteHub`;

  return {
    title,
    description: `Browse your ${filter} notes on NoteHub.`,
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const currentTag = slug[0] || 'all';

  return (
    <main>
      {/* Передаємо тег для фільтрації */}
      <NotesClient initialFilter={currentTag} />
    </main>
  );
}