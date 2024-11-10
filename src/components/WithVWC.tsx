import { ReactElement, useEffect, useReducer } from 'react';
import { ValueWithCallbacks } from '../shared/callbacks/ValueWithCallbacks';

/**
 * Renders the given component, updating it whenever the callbacks are called.
 * By default, waits one event loop after receiving a callback before updating the
 * component. This behavior can be changed by setting `immediate` to true.
 */
export function WithVWC<T>(props: {
  value: ValueWithCallbacks<T>;
  component: (value: T) => ReactElement;
  immediate?: boolean;
}): ReactElement {
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  useEffect(() => {
    if (props.immediate) {
      const boundHandler = () => forceUpdate();
      props.value.callbacks.add(boundHandler);
      return () => props.value.callbacks.remove(boundHandler);
    }

    let active = true;
    let timeout: NodeJS.Timeout | undefined = undefined;
    const onTimeout = () => {
      timeout = undefined;
      if (!active) {
        return;
      }
      forceUpdate();
    };
    const onChange = () => {
      if (!active) {
        return;
      }
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(onTimeout, 0);
    };
    props.value.callbacks.add(onChange);
    return () => {
      active = false;
      if (timeout !== undefined) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      props.value.callbacks.remove(onChange);
    };
  }, [props.value, props.immediate, forceUpdate]);

  return props.component(props.value.get());
}
