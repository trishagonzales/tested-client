import { useState, useCallback, useEffect, useRef } from 'react';

export function useToggle(initialOpen = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(initialOpen);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const handleEscapeKeydown = useCallback(e => isOpen && e.key === 'Escape' && close(), [isOpen]);
  const handleClickOutside = useCallback(
    e => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) close();
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeydown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleEscapeKeydown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isOpen, open, close };
}
