import { ValueWithCallbacks } from '../callbacks/ValueWithCallbacks';

/** The information that must be provided in order to produce a context object */
export type ContextRaw = {
  /** The width of the window in pixels */
  windowWidth: ValueWithCallbacks<number>;
  /** The height of the window in pixels */
  windowHeight: ValueWithCallbacks<number>;
  /** The number of device pixels per logical pixel */
  pixelRatio: ValueWithCallbacks<number>;
};
