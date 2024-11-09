import { CSSProperties, PropsWithChildren, useEffect } from 'react';
import { ValueWithCallbacks } from '../../shared/callbacks/ValueWithCallbacks';
import { useWritableValueWithCallbacks } from '../../shared/callbacks/hooks/useWritableValueWithCallbacks';
import { setVWC } from '../../shared/callbacks/setVWC';
import { withVWC } from '../../shared/callbacks/withVWC';
import { mapManyVWC } from '../../shared/callbacks/mapManyVWC';
import { WithStyleVWC } from '../WithStyleVWC';

export type PaddingWithCallbacks =
  | {
      top: ValueWithCallbacks<number>;
      left: ValueWithCallbacks<number>;
      right: ValueWithCallbacks<number>;
      bottom: ValueWithCallbacks<number>;
      horizontal?: undefined;
      vertical?: undefined;
      all?: undefined;
    }
  | {
      top?: undefined;
      left?: undefined;
      right?: undefined;
      bottom?: undefined;
      horizontal: ValueWithCallbacks<number>;
      vertical: ValueWithCallbacks<number>;
      all?: undefined;
    }
  | {
      top?: undefined;
      left?: undefined;
      right?: undefined;
      bottom?: undefined;
      horizontal?: undefined;
      vertical?: undefined;
      all: ValueWithCallbacks<number>;
    };

const setVWCProps = {
  equalityFn: (a: CSSProperties, b: CSSProperties) => a.padding === b.padding,
};

/**
 * Convenience component for building padding from values with callbacks
 *
 * This is careful not to rerender the children just because the padding changes.
 */
export const Padded = (
  props: PropsWithChildren<PaddingWithCallbacks & { className?: string }>
) => {
  const styleVWC = useWritableValueWithCallbacks((): CSSProperties => {
    if (props.all !== undefined) {
      return { padding: `${props.all.get()}px` };
    }
    if (props.horizontal !== undefined && props.vertical !== undefined) {
      return {
        padding: `${props.vertical.get()}px ${props.horizontal.get()}px`,
      };
    }
    return {
      padding: `${props.top.get()}px ${props.right.get()}px ${props.bottom.get()}px ${props.left.get()}px`,
    };
  });

  useEffect(() => {
    if (props.all !== undefined) {
      return withVWC(props.all, (all) =>
        setVWC(styleVWC, { padding: `${all}px` }, setVWCProps)
      );
    }

    if (props.horizontal !== undefined && props.vertical !== undefined) {
      const [mappedVWC, cleanupMapped] = mapManyVWC(
        [props.horizontal, props.vertical],
        () => ({
          horizontal: props.horizontal.get(),
          vertical: props.vertical.get(),
        }),
        {
          outputEqualityFn: (a, b) =>
            a.horizontal === b.horizontal && a.vertical === b.vertical,
        }
      );
      const cleanupSetter = withVWC(mappedVWC, (mapped) =>
        setVWC(
          styleVWC,
          { padding: `${mapped.vertical}px ${mapped.horizontal}px` },
          setVWCProps
        )
      );
      return () => {
        cleanupSetter();
        cleanupMapped();
      };
    }

    const [mappedVWC, cleanupMapped] = mapManyVWC(
      [props.top, props.left, props.right, props.bottom],
      () => ({
        top: props.top.get(),
        left: props.left.get(),
        right: props.right.get(),
        bottom: props.bottom.get(),
      }),
      {
        outputEqualityFn: (a, b) =>
          a.top === b.top &&
          a.left === b.left &&
          a.right === b.right &&
          a.bottom === b.bottom,
      }
    );
    const cleanupSetter = withVWC(mappedVWC, (mapped) =>
      setVWC(
        styleVWC,
        {
          padding: `${mapped.top}px ${mapped.right}px ${mapped.bottom}px ${mapped.left}px`,
        },
        setVWCProps
      )
    );
    return () => {
      cleanupSetter();
      cleanupMapped();
    };
  }, [
    props.top,
    props.left,
    props.right,
    props.bottom,
    props.horizontal,
    props.vertical,
    props.all,
  ]);

  return (
    <WithStyleVWC
      style={styleVWC}
      component={(ref) => (
        <div
          ref={(el) => setVWC(ref, el)}
          style={styleVWC.get()}
          className={props.className}
        >
          {props.children}
        </div>
      )}
    />
  );
};
