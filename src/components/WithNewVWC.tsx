import { ReactElement } from 'react';
import { useWritableValueWithCallbacks } from '../shared/callbacks/hooks/useWritableValueWithCallbacks';
import { WritableValueWithCallbacks } from '../shared/callbacks/WritableValueWithCallbacks';

/**
 * Convenience component that creates a new writable value with callbacks and uses
 * it to build a component. Essentially this is when you want a conditionally initialized
 * vwc.
 */
export function WithNewVWC<T>(props: {
  initial: () => T;
  component: (vwc: WritableValueWithCallbacks<T>) => ReactElement;
}): ReactElement {
  const vwc = useWritableValueWithCallbacks(props.initial);
  return props.component(vwc);
}
