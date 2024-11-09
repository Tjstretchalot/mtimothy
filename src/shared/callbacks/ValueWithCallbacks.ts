import { Callbacks } from './Callbacks';

/**
 * Describes some value that actively informs other parts of the code when it changes,
 * but can not necessarily be changed.
 */
export type ValueWithCallbacks<T> = {
  /**
   * A function which retrieves the current value
   * @returns the current value
   */
  get: () => T;

  /**
   * Callbacks which are invoked whenever the value changes.
   */
  callbacks: Callbacks;
};
