import { useEffect, useRef } from 'react';

export const useKeyboardNavigation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const currentElement = document.activeElement;
      const currentIndex = Array.from(focusableElements).indexOf(currentElement as Element);

      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % focusableElements.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = focusableElements.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      (focusableElements[nextIndex] as HTMLElement).focus();
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  return containerRef;
}; 