import { useCallback } from 'react';
import { setVWC } from '../setVWC';
import { ValueWithCallbacks } from '../ValueWithCallbacks';
import { useVWC } from './useVWC';
import { useWritableValueWithCallbacks } from './useWritableValueWithCallbacks';

/**
 * A convenience hook variant of `mapVWC` which returns a new value with
 * callbacks that is updated whenever the source value changes using the
 * provided mapper function.
 *
 * This will call the mapper twice initially: once when the hook is first
 * mounted and then once again when the effect is mounted. This will also call
 * the mapper if `source`, `mapper`, or `outputEqualityFn` are no longer
 * referentially equal
 */
export const useMappedVWC = <T, U>(
  source: ValueWithCallbacks<T>,
  mapper: (v: T) => U,
  opts?: {
    outputEqualityFn?: (a: U, b: U) => boolean;
  }
): ValueWithCallbacks<U> => {
  const result = useWritableValueWithCallbacks(() => mapper(source.get()));
  const outputEqualityFn = opts?.outputEqualityFn;
  const boundSetter = useCallback(
    (v: T) =>
      setVWC(
        result,
        mapper(v),
        outputEqualityFn === undefined
          ? undefined
          : { equalityFn: outputEqualityFn }
      ),
    [result, mapper, outputEqualityFn]
  );
  useVWC(source, boundSetter);
  return result;
};
