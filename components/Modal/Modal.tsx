'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import css from './Modal.module.css';

export default function Modal({ children }: { children: React.ReactNode }) {
  const backdrop = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back(); 
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdrop.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div ref={backdrop} className={css.backdrop} onClick={onClick}>
      <div ref={modal} className={css.modal}>
        <button className={css.closeBtn} onClick={onDismiss}>✕</button>
        {children}
      </div>
    </div>
  );
}