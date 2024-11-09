import { createWritableValueWithCallbacks } from './createWritableValueWithCallbacks';
import { setVWC } from './setVWC';
import { ValueWithCallbacks } from './ValueWithCallbacks';

/**
 * Converts the source value with callbacks to a new value with callbacks, where the
 * value is the result of applying the mapper function to the source value.
 *
 * Skips calling the callbacks if the output value already matches according to
 * the output equality function, which by default is true if the values are
 * immutable and equal (i.e, two objects always compare false even if
 * Object.is(a, b), but two numbers that are the same compare true)
 *
 * @returns A tuple where the first element is the new value with callbacks, and the
 *   second element is a function to cleanup the mapping (detaching from the source)
 */
export const mapVWC = <T, U>(
  source: ValueWithCallbacks<T>,
  mapper: (v: T) => U,
  opts?: {
    outputEqualityFn?: (a: U, b: U) => boolean;
  }
): [ValueWithCallbacks<U>, () => void] => {
  const setVWCOpts =
    opts === undefined || opts.outputEqualityFn === undefined
      ? undefined
      : { equalityFn: opts.outputEqualityFn };
  const output = createWritableValueWithCallbacks(mapper(source.get()));

  const onSourceChanged = () => {
    setVWC(output, mapper(source.get()), setVWCOpts);
  };

  source.callbacks.add(onSourceChanged);
  return [
    output,
    () => {
      source.callbacks.remove(onSourceChanged);
    },
  ];
};
