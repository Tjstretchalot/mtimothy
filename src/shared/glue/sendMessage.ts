import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { setVWC } from '../callbacks/setVWC';
import { WritableValueWithCallbacks } from '../callbacks/WritableValueWithCallbacks';
import { Cancelable } from '../cancelable/Cancelable';
import { CommonError } from '../errors/CommonError';
import { waitForCallbacks } from './waitForCallbacks';

/**
 * Waits for the message to be null, then writes the value to it and resolves
 * once the message is null again. This has no guarrantee of fairness, may wait
 * longer than necessary under multiple sendMessages, and assumes get() is
 * side-effect free.
 *
 * Generally, the design choice is that the majority of the time sendMessage is
 * called serially (ie, after the previous one resolves), and if there is
 * contention (e.g. because of a button lacking a disabled state) all we need to do is not error.
 */
export const sendMessage = <T>(
  message: WritableValueWithCallbacks<T | null>,
  value: T
): Cancelable<void> => {
  let done = false;
  const canceled = createWritableValueWithCallbacks(false);
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

          if (message.get() === null) {
            message.set(value);
            message.callbacks.call();
            break;
          }

          const sawValueChange = waitForCallbacks(message.callbacks);
          try {
            await Promise.race([sawCanceled.promise, sawValueChange.promise]);
          } finally {
            sawValueChange.cancel();
          }
        }

        while (true) {
          if (canceled.get()) {
            reject(
              new CommonError('canceled before cleared', {
                isHumanReadable: false,
              })
            );
            done = true;
            return;
          }

          const sawValueChange = waitForCallbacks(message.callbacks);
          if (message.get() === null) {
            resolve();
            done = true;
            return;
          }

          try {
            await Promise.race([sawCanceled.promise, sawValueChange.promise]);
          } finally {
            sawValueChange.cancel();
          }
        }
      } catch (e) {
        if (!done) {
          reject(
            new CommonError('failed to send message', {
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
