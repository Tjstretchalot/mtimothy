import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { mapManyVWC } from '../callbacks/mapManyVWC';
import { mapVWC } from '../callbacks/mapVWC';
import { Context } from './Context';
import { ContextRaw } from './ContextRaw';

const WIDTH_BREAKPOINTS = [342, 576, 768, 992, 1200, 1400];
/**
 * Attaches to the given data to create a context object. Can be detached using
 * the second return value.
 */
export const createContextFromRaw = (
  raw: ContextRaw
): [Context, () => void] => {
  const [windowWidthVWC, cleanupWindowWidth] = mapVWC(
    raw.windowWidth,
    (v) => v
  );
  const [windowHeightVWC, cleanupWindowHeight] = mapVWC(
    raw.windowHeight,
    (v) => v
  );
  const [pixelRatioVWC, cleanupPixelRatio] = mapVWC(raw.pixelRatio, (v) => v);

  const [contentWidthVWC, cleanupContentWidth] = mapVWC(windowWidthVWC, (v) => {
    if (v < WIDTH_BREAKPOINTS[0]) {
      return v - 16;
    }
    for (let i = 1; i < WIDTH_BREAKPOINTS.length; i++) {
      if (v < WIDTH_BREAKPOINTS[i]) {
        return WIDTH_BREAKPOINTS[i - 1];
      }
    }
    return WIDTH_BREAKPOINTS[WIDTH_BREAKPOINTS.length - 1];
  });

  const [leftPaddingVWC, cleanupLeftPadding] = mapManyVWC(
    [windowWidthVWC, contentWidthVWC],
    () => {
      return (windowWidthVWC.get() - contentWidthVWC.get()) / 2;
    }
  );
  const [rightPaddingVWC, cleanupRightPadding] = mapManyVWC(
    [windowWidthVWC, contentWidthVWC, leftPaddingVWC],
    () => {
      return (
        windowWidthVWC.get() - contentWidthVWC.get() - leftPaddingVWC.get()
      );
    }
  );

  const topPaddingVWC = createWritableValueWithCallbacks(16);
  const bottomPaddingVWC = createWritableValueWithCallbacks(32);
  const [contentHeightVWC, cleanupContentHeight] = mapManyVWC(
    [windowHeightVWC, topPaddingVWC, bottomPaddingVWC],
    () => {
      return (
        windowHeightVWC.get() - topPaddingVWC.get() - bottomPaddingVWC.get()
      );
    }
  );

  return [
    {
      windowWidth: windowWidthVWC,
      windowHeight: windowHeightVWC,
      pixelRatio: pixelRatioVWC,
      topPadding: topPaddingVWC,
      leftPadding: leftPaddingVWC,
      rightPadding: rightPaddingVWC,
      bottomPadding: bottomPaddingVWC,
      contentWidth: contentWidthVWC,
      contentHeight: contentHeightVWC,
    },
    () => {
      cleanupWindowWidth();
      cleanupWindowHeight();
      cleanupPixelRatio();
      cleanupContentWidth();
      cleanupLeftPadding();
      cleanupRightPadding();
      cleanupContentHeight();
    },
  ];
};
