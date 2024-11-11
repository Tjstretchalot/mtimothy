import { ValueWithCallbacks } from '../callbacks/ValueWithCallbacks';

/** The typical context object we pass around */
export type Context = {
  /** The height of the window in pixels; updates immediately */
  windowHeight: ValueWithCallbacks<number>;

  /** The width of the window in pixels; updates immediately */
  windowWidth: ValueWithCallbacks<number>;

  /** The number of device pixels per logical pixel */
  pixelRatio: ValueWithCallbacks<number>;

  /** The standard padding at the top of the screen for non-decorative elements, in pixels */
  topPadding: ValueWithCallbacks<number>;

  /** The standard padding at the left of the screen for non-decorative elements, in pixels */
  leftPadding: ValueWithCallbacks<number>;

  /** The standard padding at the right of the screen for non-decorative elements, in pixels */
  rightPadding: ValueWithCallbacks<number>;

  /** The standard padding at the bottom of the screen for non-decorative elements, in pixels */
  bottomPadding: ValueWithCallbacks<number>;

  /** windowWidth - (leftPadding + rightPadding) */
  contentWidth: ValueWithCallbacks<number>;

  /** windowHeight - (topPadding + bottomPadding) */
  contentHeight: ValueWithCallbacks<number>;

  /** true if @media print would apply styles, false if it would not */
  printing: ValueWithCallbacks<boolean>;
};
