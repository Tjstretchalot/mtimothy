import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { setVWC } from '../callbacks/setVWC';
import { WritableValueWithCallbacks } from '../callbacks/WritableValueWithCallbacks';
import { Cancelable } from '../cancelable/Cancelable';
import { CommonError } from '../errors/CommonError';
import { waitForCallbacks } from './waitForCallbacks';

/**
 * Waits until the value in the message is not null, then returns a function
 * that errors if the value is now null and otherwise sets the value to null
 * and returns the original value.
 *
 * Generally this is used on the task side with sendMessage used on the caller
 * side.
 *
 * Note that if you don't call the returned function we don't unset the message,
 * so this is safe to cancel without then waiting to check if it resolves or rejects.
 */
export const receiveMessage = <T>(
  message: WritableValueWithCallbacks<T | null>
): Cancelable<() => T> => {
  const canceled = createWritableValueWithCallbacks(false);
  let done = false;

  return {
    promise: new Promise(async (resolve, reject) => {
      const sawCanceled = waitForCallbacks(canceled.callbacks);
      try {
        while (true) {
          if (canceled.get()) {
            reject(
              new CommonError('canceled before set', { isHumanReadable: false })
            );
            done = true;
            return;
          }

          if (message.get() !== null) {
            resolve(() => {
              const val = message.get();
              if (val === null) {
                throw new CommonError('value was unset elsewhere', {
                  isHumanReadable: false,
                });
              }
              message.set(null);
              message.callbacks.call();
              return val;
            });
            done = true;
            return;
          }

          const sawValueChange = waitForCallbacks(message.callbacks);
          try {
            await Promise.race([sawCanceled.promise, sawValueChange.promise]);
          } finally {
            sawValueChange.cancel();
          }
        }
      } catch (e) {
        if (!done) {
          reject(
            new CommonError('unexpected error', {
              isHumanReadable: false,
              cause: e instanceof CommonError ? e : undefined,
            })
          );
        }
      } finally {
        sawCanceled.cancel();
      }
    }),
    done: () => done,
    cancel: () => {
      setVWC(canceled, true);
    },
  };
};
