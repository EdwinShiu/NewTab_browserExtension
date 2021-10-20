import { useRef, useEffect } from 'react';

/**
 * This hook store the previous value of the state.
 * 
 * @param value the value of the state
 * @returns 
 */
export function usePrevious<Type>(value: Type): Type | undefined {
  const ref = useRef<Type>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]);
  // Return previous value before useEffect is called
  return ref.current;
}