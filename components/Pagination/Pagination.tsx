import css from './Pagination.module.css';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ current, total, onChange }: PaginationProps) => {
  if (total <= 1) return null;
  return (
    <div className={css.pagination}>
      <button onClick={() => onChange(current - 1)} disabled={current === 1}>← Previous</button>
      <span>Page {current} of {total}</span>
      <button onClick={() => onChange(current + 1)} disabled={current === total}>Next →</button>
    </div>
  );
};