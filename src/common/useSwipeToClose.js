import { useRef, useCallback } from "react";

export function useSwipeToClose(onClose, threshold = 60) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX.current;
      const deltaY = event.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > threshold) {
        onClose();
      }
    },
    [onClose, threshold]
  );

  return { handleTouchStart, handleTouchEnd };
}
