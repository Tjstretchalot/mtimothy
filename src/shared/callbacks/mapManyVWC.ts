import { createWritableValueWithCallbacks } from './createWritableValueWithCallbacks';
import { setVWC } from './setVWC';
import { ValueWithCallbacks } from './ValueWithCallbacks';

/**
 * Returns a new value with callbacks produced by the given mapper function,
 * rechecked if any of the values change. We do not provide the values to
 * the mapper as the types would be worse than just calling get() on the
 * values directly (T will typically be a pretty useless inferred type)
 *
 * The second result in the tuple releases the resources used by the mapping
 * (detaching from the source values)
 *
 * This function waits until the next event loop to call the mapper when
 * one of the values changed, to give the rest a moment to update. This
 * behavior can be skipped by setting the `immediate` option to true
 */
export const mapManyVWC = <T, U extends ValueWithCallbacks<T>, V>(
  values: readonly U[],
  mapper: () => V,
  opts?: {
    outputEqualityFn?: (a: V, b: V) => boolean;
    immediate?: boolean;
  }
): [ValueWithCallbacks<V>, () => void] => {
  const setVWCOpts =
    opts === undefined || opts.outputEqualityFn === undefined
      ? undefined
      : { equalityFn: opts.outputEqualityFn };
  const result = createWritableValueWithCallbacks(mapper());

  let active = true;
  let timeout: NodeJS.Timeout | undefined = undefined;

  const onValueChangedImmediate = () => {
    timeout = undefined;
    if (!active) {
      return;
    }
    setVWC(result, mapper(), setVWCOpts);
  };

  const onValueChanged = opts?.immediate
    ? onValueChangedImmediate
    : () => {
        if (!active) {
          return;
        }
        if (timeout !== undefined) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(onValueChangedImmediate, 0);
      };

  for (const value of values) {
    value.callbacks.add(onValueChanged);
  }

  return [
    result,
    () => {
      active = false;
      if (timeout !== undefined) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      for (const value of values) {
        value.callbacks.remove(onValueChanged);
      }
    },
  ];
};
