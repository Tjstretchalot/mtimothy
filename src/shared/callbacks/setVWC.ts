import { defaultEqualityFn } from './defaultEqualityFn';
import { WritableValueWithCallbacks } from './WritableValueWithCallbacks';

/**
 * Convenience function to set the value of a WritableValueWithCallbacks and
 * call the callbacks immediately, which is what you want 95% of the time.
 *
 * Skips the invocation and set if the value already matches according to
 * the equality function. By default, the equality function is true if they
 * are both immutable and the same.
 */
export const setVWC = <T>(
  vwc: WritableValueWithCallbacks<T>,
  value: T,
  opts?: {
    equalityFn?: (a: T, b: T) => boolean;
  }
): void => {
  const old = vwc.get();
  const equalityFn = opts?.equalityFn ?? defaultEqualityFn;
  if (equalityFn(old, value)) {
    return;
  }

  vwc.set(value);
  vwc.callbacks.call();
};
