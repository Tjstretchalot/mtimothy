import { WIDTH_BREAKPOINTS } from '../../styles/breakpoints';
import { SPACERS } from '../../styles/spacers';
import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { mapManyVWC } from '../callbacks/mapManyVWC';
import { mapVWC } from '../callbacks/mapVWC';
import { Context } from './Context';
import { ContextRaw } from './ContextRaw';

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
  const [printingVWC, cleanupPrinting] = mapVWC(raw.printing, (v) => v);

  const [contentWidthVWC, cleanupContentWidth] = mapVWC(windowWidthVWC, (v) => {
    if (v < WIDTH_BREAKPOINTS[0]) {
      return v - SPACERS.xsmall * 2;
    }
    for (let i = 1; i < WIDTH_BREAKPOINTS.length; i++) {
      if (v < WIDTH_BREAKPOINTS[i]) {
        return Math.min(WIDTH_BREAKPOINTS[i - 1], v - SPACERS.small * 2);
      }
    }
    return Math.min(
      WIDTH_BREAKPOINTS[WIDTH_BREAKPOINTS.length - 1],
      v - SPACERS.large * 2
    );
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

  const topPaddingVWC = createWritableValueWithCallbacks(SPACERS.medium);
  const bottomPaddingVWC = createWritableValueWithCallbacks(SPACERS.large);
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
      printing: printingVWC,
    },
    () => {
      cleanupWindowWidth();
      cleanupWindowHeight();
      cleanupPixelRatio();
      cleanupPrinting();
      cleanupContentWidth();
      cleanupLeftPadding();
      cleanupRightPadding();
      cleanupContentHeight();
    },
  ];
};
