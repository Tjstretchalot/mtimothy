import { withVWC } from '../callbacks/withVWC';
import { Context } from './Context';

/**
 * Ensures that the CSS root vars match the context vars. Returns a function that
 * can be called to detach the context from the root CSS vars.
 */
export const attachContextToRootCSSVars = (context: Context): (() => void) => {
  const detachWindowWidth = withVWC(context.windowWidth, (windowWidth) => {
    document.documentElement.style.setProperty(
      '--window-width',
      `${windowWidth}px`
    );
  });
  const detachWindowHeight = withVWC(context.windowHeight, (windowHeight) => {
    document.documentElement.style.setProperty(
      '--window-height',
      `${windowHeight}px`
    );
  });
  const detachPixelRatio = withVWC(context.pixelRatio, (pixelRatio) => {
    document.documentElement.style.setProperty(
      '--pixel-ratio',
      `${pixelRatio}`
    );
  });
  const detachTopPadding = withVWC(context.topPadding, (topPadding) => {
    document.documentElement.style.setProperty(
      '--top-padding',
      `${topPadding}px`
    );
  });
  const detachLeftPadding = withVWC(context.leftPadding, (leftPadding) => {
    document.documentElement.style.setProperty(
      '--left-padding',
      `${leftPadding}px`
    );
  });
  const detachRightPadding = withVWC(context.rightPadding, (rightPadding) => {
    document.documentElement.style.setProperty(
      '--right-padding',
      `${rightPadding}px`
    );
  });
  const detachBottomPadding = withVWC(
    context.bottomPadding,
    (bottomPadding) => {
      document.documentElement.style.setProperty(
        '--bottom-padding',
        `${bottomPadding}px`
      );
    }
  );
  const detachContentWidth = withVWC(context.contentWidth, (contentWidth) => {
    document.documentElement.style.setProperty(
      '--content-width',
      `${contentWidth}px`
    );
  });
  const detachContentHeight = withVWC(
    context.contentHeight,
    (contentHeight) => {
      document.documentElement.style.setProperty(
        '--content-height',
        `${contentHeight}px`
      );
    }
  );
  return () => {
    detachWindowWidth();
    detachWindowHeight();
    detachPixelRatio();
    detachTopPadding();
    detachLeftPadding();
    detachRightPadding();
    detachBottomPadding();
    detachContentWidth();
    detachContentHeight();
  };
};
