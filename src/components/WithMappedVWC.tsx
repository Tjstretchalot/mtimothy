import { ReactElement } from 'react';
import { useMapManyVWC } from '../shared/callbacks/hooks/useMapManyVWC';
import { ValueWithCallbacks } from '../shared/callbacks/ValueWithCallbacks';
import { WithVWC } from './WithVWC';

/**
 * Renders a component using a mapped representation of the given values. If any
 * of the values change, we call the mapper. If the result of the mapper changes
 * according to the output equality function, we render the component (on the
 * next event loop unless immediate is true).
 *
 * This component is just a convenient combination of `useMapManyVWC` and
 * `WithVWC` which allows it to be nested within conditionals.
 *
 * The default equality function is true if the values are immutable and equal,
 * so it's false if the result is an object even if the old and new objects are
 * referentially equal. This allows using mutating objects as the values when
 * required for performance.
 */
export function WithMappedVWC<T, U extends ValueWithCallbacks<T>, V>(props: {
  values: readonly U[];
  mapper: () => V;
  component: (value: V) => ReactElement;
  outputEqualityFn?: (a: V, b: V) => boolean;
  immediate?: boolean;
}): ReactElement {
  const result = useMapManyVWC(
    props.values,
    props.mapper,
    props.outputEqualityFn === undefined && props.immediate === undefined
      ? undefined
      : {
          outputEqualityFn: props.outputEqualityFn,
          immediate: props.immediate,
        }
  );
  return (
    <WithVWC value={result} component={props.component} immediate={true} />
  );
}
