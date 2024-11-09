import { CSSProperties } from 'react';
import { ValueWithCallbacks } from '../callbacks/ValueWithCallbacks';

/**
 * Applies the given style vwc to the element. Assumes that the style always
 * has the same keys set, and does not cleanup the style. Returns a function
 * to detach from the style vwc.
 */
export const applyStyle = <T extends HTMLElement>(
  style: ValueWithCallbacks<CSSProperties>,
  element: ValueWithCallbacks<T | null>
): (() => void) => {
  const boundHandler = () => {
    const el = element.get();
    if (el !== null) {
      Object.assign(el.style, style.get());
    }
  };
  style.callbacks.add(boundHandler);
  boundHandler();
  return () => style.callbacks.remove(boundHandler);
};
