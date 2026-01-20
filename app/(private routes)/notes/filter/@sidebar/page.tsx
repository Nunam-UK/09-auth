import Link from 'next/link';

export default function SidebarPage() {
  const tags = ['Work', 'Personal', 'Shopping', 'Meeting', 'Todo'];
  return (
    <nav>
      <h3>Categories</h3>
      <ul>
        <li><Link href="/notes/filter/all">All Notes</Link></li>
        {tags.map(tag => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag.toLowerCase()}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}