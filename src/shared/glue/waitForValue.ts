import { ValueWithCallbacks } from '../callbacks/ValueWithCallbacks';
import { CommonError } from '../errors/CommonError';
import { setVWC } from '../callbacks/setVWC';
import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { waitForCallbacks } from './waitForCallbacks';
import { Cancelable } from '../cancelable/Cancelable';

/**
 * Waits for the given value to satisfy the given predicate. For convenience,
 * instead of the predicate returning a boolean value, it can return any
 * non-null/false value and that is what the cancelable promise will resolve to.
 * This is useful to avoid to repeat the predicate to verify the final type of
 * the value when the predicate is restricting the type.
 *
 * If the restriction doesn't matter, let `U` be `true` and ignore the result
 * of the promise since `vwc.get()` is sufficient for the type checker.
 */
export const waitForValue = <T, U>(
  vwc: ValueWithCallbacks<T>,
  predicate: (t: T) => U | false
): Cancelable<U> => {
  let done = false;
  const canceled = createWritableValueWithCallbacks(false);

  return {
    promise: new Promise(async (resolve, reject) => {
      const sawCanceled = waitForCallbacks(canceled.callbacks);
      try {
        while (true) {
          if (canceled.get()) {
            reject(
              new CommonError('canceled', {
                isHumanReadable: false,
              })
            );
            done = true;
            return;
          }

          const sawValueChange = waitForCallbacks(vwc.callbacks);
          try {
            const predResult = predicate(vwc.get());
            if (predResult !== false) {
              resolve(predResult);
              done = true;
              return;
            }

            await Promise.race([sawCanceled.promise, sawValueChange.promise]);
          } finally {
            sawValueChange.cancel();
          }
        }
      } catch (e) {
        if (!done) {
          reject(
            new CommonError('failed to check predicate', {
              isHumanReadable: false,
              cause: e instanceof CommonError ? e : undefined,
            })
          );
          done = true;
        }
      } finally {
        sawCanceled.cancel();
        if (!done) {
          reject(new CommonError('unreachable', { isHumanReadable: false }));
          done = true;
        }
      }
    }),
    done: () => done,
    cancel: () => {
      setVWC(canceled, true);
    },
  };
};
