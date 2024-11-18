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
     * If set, we ensure we will not break reflowing on the parent element.
     */
    allowParentToReflow?: boolean;
  }>
) => {
  const inner = (
    <WithStyleVWC
      style={useMapManyVWC(
        [props.width, props.height],
        () => {
          return {
            width: `${props.width.get()}px`,
            height: `${props.height.get()}px`,
          };
        },
        {
          immediate: true,
        }
      )}
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

  // This fixes entering developer tools on chrome (esp when changing pixel ratio)
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
