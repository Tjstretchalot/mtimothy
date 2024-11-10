import { Callbacks } from './Callbacks';
import { ValueWithCallbacks } from './ValueWithCallbacks';

const CONSTANTS_CALLBACKS = new Callbacks();

/** Helper for creating a value with callbacks with a constant value */
export const constantVWC = <T>(value: T): ValueWithCallbacks<T> => ({
  get: () => value,
  callbacks: CONSTANTS_CALLBACKS,
});
