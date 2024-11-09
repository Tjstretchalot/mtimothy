import { Callbacks } from './Callbacks';
import { WritableValueWithCallbacks } from './WritableValueWithCallbacks';

/**
 * Creates a writable value with callbacks with the given initial value.
 *
 * @param initial the initial value
 * @returns a value with callbacks, initialized to initial
 */
export const createWritableValueWithCallbacks = <T>(
  initial: T
): WritableValueWithCallbacks<T> => {
  let current = initial;
  const callbacks = new Callbacks();
  return {
    get: () => current,
    set: (t: T) => {
      current = t;
    },
    callbacks,
  };
};
