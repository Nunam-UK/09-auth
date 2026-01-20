import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h1>404 - Сторінку не знайдено</h1>
      <Link href="/notes" style={{ color: '#007bff' }}>Повернутися до нотаток</Link>
    </div>
  );
}