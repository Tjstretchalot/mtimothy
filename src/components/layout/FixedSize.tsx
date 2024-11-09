import { PropsWithChildren } from 'react';
import { useMapManyVWC } from '../../shared/callbacks/hooks/useMapManyVWC';
import { setVWC } from '../../shared/callbacks/setVWC';
import { ValueWithCallbacks } from '../../shared/callbacks/ValueWithCallbacks';
import { WithStyleVWC } from '../WithStyleVWC';

/**
 * Convenience function to produce a div with a fixed with and height. The divs
 * width and height are updated when the values change without rerendering the
 * children.
 */
export const FixedSize = (
  props: PropsWithChildren<{
    width: ValueWithCallbacks<number>;
    height: ValueWithCallbacks<number>;
    className?: string;
  }>
) => {
  return (
    <WithStyleVWC
      style={useMapManyVWC([props.width, props.height], () => ({
        width: `${props.width.get()}px`,
        height: `${props.height.get()}px`,
      }))}
      component={(div, style) => (
        <div
          className={props.className}
          ref={(v) => setVWC(div, v)}
          style={style.get()}
        >
          {props.children}
        </div>
      )}
    />
  );
};
