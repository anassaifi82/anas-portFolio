import { useCallback, useEffect, useRef } from "react";

export function useTabListKeyboard(items, activeId, onChange) {
  const tabRefs = useRef([]);
  const pendingFocusIndex = useRef(null);

  const setTabRef = useCallback((index, node) => {
    tabRefs.current[index] = node;
  }, []);

  useEffect(() => {
    if (pendingFocusIndex.current === null) {
      return;
    }

    tabRefs.current[pendingFocusIndex.current]?.focus();
    pendingFocusIndex.current = null;
  }, [activeId]);

  const focusTab = useCallback(
    (index) => {
      pendingFocusIndex.current = index;
      onChange(items[index]);
    },
    [items, onChange]
  );

  const handleKeyDown = useCallback(
    (event, index) => {
      const lastIndex = items.length - 1;
      let nextIndex = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          nextIndex = index === lastIndex ? 0 : index + 1;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          nextIndex = index === 0 ? lastIndex : index - 1;
          break;
        case "Home":
          event.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          event.preventDefault();
          nextIndex = lastIndex;
          break;
        default:
          return;
      }

      focusTab(nextIndex);
    },
    [focusTab, items.length]
  );

  const getTabProps = useCallback(
    (id, index) => {
      const selected = activeId === id;

      return {
        role: "tab",
        type: "button",
        "aria-selected": selected,
        tabIndex: selected ? 0 : -1,
        onKeyDown: (event) => handleKeyDown(event, index),
        onClick: () => onChange(id),
        ref: (node) => setTabRef(index, node),
      };
    },
    [activeId, handleKeyDown, onChange, setTabRef]
  );

  return {
    tabListProps: {
      role: "tablist",
      "aria-orientation": "horizontal",
    },
    getTabProps,
  };
}
