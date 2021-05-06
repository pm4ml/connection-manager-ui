import { useState, useEffect, useLayoutEffect, MutableRefObject } from 'react';

// Hook
export function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export function useWidth(ref: MutableRefObject<HTMLDivElement> | null) {
  const [width, setWidth] = useState(0);
  const windowSize = useWindowSize();
  useLayoutEffect(() => {
    const size = ref?.current?.getBoundingClientRect();
    if (size) {
      setWidth(size.width);
    }
  }, [windowSize, ref]);

  return width;
}
