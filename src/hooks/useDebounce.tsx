import { useEffect, useRef } from "react";

/**
 * useDebounce hook to debounce a function
 *
 * This hook allows you to debounce a fast-executing function. The debounced function
 * will only execute after the specified delay period if it has not been called again.
 *
 * @param functionToDebounce - The function to be debounced
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced function
 */
export default function useDebounce<T extends (...args: any[]) => any>(
  functionToDebounce: T,
  delay: number
): T {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return ((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      functionToDebounce(...args);
    }, delay);
  }) as T;
}
