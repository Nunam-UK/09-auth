'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  if (total <= 1) return null;

  return (
    <div className={css.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={page === current ? css.activePage : css.pageBtn}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}