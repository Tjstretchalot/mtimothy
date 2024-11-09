import { useEffect } from 'react';
import { useWritableValueWithCallbacks } from './useWritableValueWithCallbacks';
import { mapManyVWC } from '../mapManyVWC';
import { setVWC } from '../setVWC';
import { withVWC } from '../withVWC';
import { ValueWithCallbacks } from '../ValueWithCallbacks';

/**
 * A hook-like function that is equivalent to `mapManyVWC`. Calls the given
 * mapper function to get the value whenever any of the source values change.
 *
 * By default, this waits one event loop after receiving a callback before
 * calling the mapper. This behavior can be changed by setting `immediate` to
 * true.
 */
export const useMapManyVWC = <T, U extends ValueWithCallbacks<T>, V>(
  values: readonly U[],
  mapper: () => V,
  opts?: {
    outputEqualityFn?: (a: V, b: V) => boolean;
    immediate?: boolean;
  }
): ValueWithCallbacks<V> => {
  const result = useWritableValueWithCallbacks(mapper);

  useEffect(() => {
    const [inner, cleanupInner] = mapManyVWC(values, mapper, opts);
    const cleanupAttacher = withVWC(inner, (v) => {
      setVWC(
        result,
        v,
        opts === undefined || opts.outputEqualityFn === undefined
          ? undefined
          : { equalityFn: opts.outputEqualityFn }
      );
    });
    return () => {
      cleanupAttacher();
      cleanupInner();
    };
  }, [result, ...values, mapper, opts?.outputEqualityFn, opts?.immediate]);

  return result;
};
