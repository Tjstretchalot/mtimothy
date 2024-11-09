import { Callbacks } from '../callbacks/Callbacks';
import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { setVWC } from '../callbacks/setVWC';
import { Cancelable } from '../cancelable/Cancelable';
import { CommonError } from '../errors/CommonError';

/**
 * Waits for the given callbacks to be invoked, removing the listener if
 * canceled instead. This is guaranteed not to yield before registering
 * a listener to the callback regardless of the js implementation.
 */
export const waitForCallbacks = (callbacks: Callbacks): Cancelable<void> => {
  const canceled = createWritableValueWithCallbacks(true);
  let done = false;

  let sawCallbackImmediately = false;
  const onSawCallbackImmediately = () => {
    sawCallbackImmediately = true;
  };
  callbacks.add(onSawCallbackImmediately);

  return {
    promise: new Promise(async (resolve, reject) => {
      if (canceled.get()) {
        callbacks.remove(onSawCallbackImmediately);
        reject(new CommonError('canceled', { isHumanReadable: false }));
        done = true;
        return;
      }

      if (sawCallbackImmediately) {
        callbacks.remove(onSawCallbackImmediately);
        resolve();
        done = true;
        return;
      }

      try {
        let notifyCanceledCalled: (() => void) | null = null as
          | (() => void)
          | null;
        const canceledPromise = new Promise<void>((resolve) => {
          notifyCanceledCalled = resolve;
        });

        let notifyCallbackCalled: (() => void) | null = null as
          | (() => void)
          | null;
        const callbackPromise = new Promise<void>((resolve) => {
          notifyCallbackCalled = resolve;
        });

        while (notifyCanceledCalled === null || notifyCallbackCalled === null) {
          if (canceled.get()) {
            reject(new CommonError('canceled', { isHumanReadable: false }));
            done = true;
            return;
          }
          // move to next event loop as this js implementation requires it
          await new Promise((resolve) => setTimeout(resolve, 0));
        }

        canceled.callbacks.add(notifyCanceledCalled);
        callbacks.add(notifyCallbackCalled);

        if (canceled.get()) {
          canceled.callbacks.remove(notifyCanceledCalled);
          callbacks.remove(notifyCallbackCalled);
          callbacks.remove(onSawCallbackImmediately);
          reject(new CommonError('canceled', { isHumanReadable: false }));
          done = true;
          return;
        }

        if (sawCallbackImmediately) {
          canceled.callbacks.remove(notifyCanceledCalled);
          callbacks.remove(notifyCallbackCalled);
          callbacks.remove(onSawCallbackImmediately);
          resolve();
          done = true;
          return;
        }

        callbacks.remove(onSawCallbackImmediately);

        await Promise.race([canceledPromise, callbackPromise]);

        canceled.callbacks.remove(notifyCanceledCalled);
        callbacks.remove(notifyCallbackCalled);

        if (canceled.get()) {
          reject(new CommonError('canceled', { isHumanReadable: false }));
          done = true;
          return;
        }

        resolve();
        done = true;
      } finally {
        if (!done) {
          callbacks.remove(onSawCallbackImmediately);
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
