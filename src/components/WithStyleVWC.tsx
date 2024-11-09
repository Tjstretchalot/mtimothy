import { CSSProperties, ReactElement } from 'react';
import { ValueWithCallbacks } from '../shared/callbacks/ValueWithCallbacks';
import { WritableValueWithCallbacks } from '../shared/callbacks/WritableValueWithCallbacks';
import { useWritableValueWithCallbacks } from '../shared/callbacks/hooks/useWritableValueWithCallbacks';
import { useApplyStyle } from '../shared/rendering/useApplyStyle';

/**
 * Convenience component that creates a writable value with callbacks to an element
 * ref. When that ref is set to an element, applies the style to that element.
 * Renders a component that takes the ref as an argument; usually setting it in
 * the ref prop of one of the elements it produces.
 *
 * Forwards the style down in case you just initialized it.
 */
export function WithStyleVWC<T extends HTMLElement>(props: {
  style: ValueWithCallbacks<CSSProperties>;
  component: (
    ref: WritableValueWithCallbacks<T | null>,
    style: ValueWithCallbacks<CSSProperties>
  ) => ReactElement;
}) {
  const ref = useWritableValueWithCallbacks<T | null>(() => null);
  useApplyStyle(props.style, ref);
  return props.component(ref, props.style);
}
