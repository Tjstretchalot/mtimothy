import { ValueWithCallbacks } from './ValueWithCallbacks';

/**
 * Convenience function for attaching a handler to the given value with callbacks
 * that is removed when the returned function is called. This also calls the handler
 * immediately after attaching it.
 */
export const withVWC = <T>(
  value: ValueWithCallbacks<T>,
  handler: (value: T) => void
): (() => void) => {
  const boundHandler = () => handler(value.get());
  value.callbacks.add(boundHandler);
  boundHandler();
  return () => value.callbacks.remove(boundHandler);
};
