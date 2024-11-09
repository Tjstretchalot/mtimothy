import { ValueWithCallbacks } from './ValueWithCallbacks';

/**
 * Describes some value that actively informs other parts of the code when it changes,
 * and can be changed.
 */
export type WritableValueWithCallbacks<T> = ValueWithCallbacks<T> & {
  /**
   * Sets the current value without invoking the callbacks. The
   * callbacks should be invoked separately.
   */
  set: (t: T) => void;
};
