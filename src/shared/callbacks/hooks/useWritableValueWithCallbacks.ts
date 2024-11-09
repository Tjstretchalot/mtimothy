import { useRef } from 'react';
import { createWritableValueWithCallbacks } from '../createWritableValueWithCallbacks';
import { WritableValueWithCallbacks } from '../WritableValueWithCallbacks';

/**
 * A hook-like function that provides a writable value with callbacks. If
 * the value hasn't been initialized yet, initial is called to get the
 * initial value. Otherwise, changes to initial are ignored.
 *
 * @param initial the initial value, ignored except during the first render
 * @returns a value with callbacks, initialized to initial
 */
export const useWritableValueWithCallbacks = <T>(
  initial: () => T
): WritableValueWithCallbacks<T> => {
  const result = useRef<WritableValueWithCallbacks<T> | null>(null);
  const old = result.current;
  if (old === null) {
    const toSet = createWritableValueWithCallbacks(initial());
    result.current = toSet;
    return toSet;
  }
  return old;
};
