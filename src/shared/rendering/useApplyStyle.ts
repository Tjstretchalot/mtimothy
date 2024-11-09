import { CSSProperties, useEffect } from 'react';
import { ValueWithCallbacks } from '../callbacks/ValueWithCallbacks';
import { applyStyle } from './applyStyle';

/**
 * Applies the given style vwc to the element. Assumes that the style always
 * has the same keys set, and does not cleanup the style. Returns a function
 * to detach from the style vwc.
 *
 * This is the hook like variant of `applyStyle`
 */
export const useApplyStyle = <T extends HTMLElement>(
  style: ValueWithCallbacks<CSSProperties>,
  element: ValueWithCallbacks<T | null>
): void => {
  useEffect(() => applyStyle(style, element), [style, element]);
};
