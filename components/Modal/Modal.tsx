'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import css from './Modal.module.css';


interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; 
}

export default function Modal({ children, onClose }: ModalProps) {
  const backdrop = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onDismiss = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [router, onClose]);

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
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onDismiss} aria-label="Close modal">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}