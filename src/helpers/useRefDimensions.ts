import { RefObject, useLayoutEffect, useRef, useState } from "react";

export const useRefDimensions = <T extends HTMLElement>(): [
  RefObject<T | null>,
  { width: number; height: number } | null,
] => {
  const elementRef = useRef<T | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((elements) => {
      for (const element of elements) {
        const { width, height } = element.contentRect;
        setDimensions({ width, height });
      }
    });

    const canvas = elementRef.current;
    if (canvas) {
      resizeObserver.observe(canvas);

      return () => resizeObserver.disconnect();
    }
  }, []);

  return [elementRef, dimensions];
};
