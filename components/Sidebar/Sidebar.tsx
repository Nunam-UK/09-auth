'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import css from './Sidebar.module.css';

const TAGS = [
  { id: 'all', label: 'All Notes' },
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
    { id: 'meeting', label: 'Meeting' },
    { id: 'shopping', label: 'Shopping' },
  { id: 'Todo', label: 'Todo' },
];

export default function Sidebar() {
  const params = useParams();
  const currentTag = params.slug?.[0] || 'all';

  return (
    <aside className={css.sidebar}>
      <h3 className={css.heading}>Categories</h3>
      <nav className={css.nav}>
        {TAGS.map((tag) => (
          <Link
            key={tag.id}
            href={`/notes/filter/${tag.id}`}
            className={clsx(css.link, {
              [css.active]: currentTag === tag.id,
            })}
          >
            {tag.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}