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

    /**
     * If set, we position absolutely to match the parent and hide any overflow.
     * This is probably what you want if you are putting this as the root component
     * to avoid the window size not changing to prevent overflow which would have
     * been fixed if it was reported to javascript
     */
    allowParentToReflow?: boolean;
  }>
) => {
  const inner = (
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

  if (props.allowParentToReflow) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {inner}
      </div>
    );
  }

  return inner;
};
