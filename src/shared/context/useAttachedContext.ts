import { useEffect, useReducer, useRef } from 'react';
import { Context } from './Context';
import { createRawContextFromWindow } from './createRawContextFromWindow';
import { createContextFromRaw } from './createContextFromRaw';
import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { attachContextToRootCSSVars } from './attachContextToRootCSSVars';

/**
 * Creates a new raw context from the window, converts it into a context object,
 * attaches it to the document root, and provides it.
 */
export const useAttachedContext = (): Context => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const result = useRef<Context | null>(null);
  useEffect(() => {
    const [raw, cleanupRaw] = createRawContextFromWindow();
    const [context, cleanupContext] = createContextFromRaw(raw);
    const cleanupAttacher = attachContextToRootCSSVars(context);
    result.current = context;
    forceUpdate();
    return () => {
      if (Object.is(result.current, context)) {
        result.current = null;
      }
      cleanupAttacher();
      cleanupContext();
      cleanupRaw();
    };
  }, []);

  const val = result.current;
  if (val === null) {
    // we are ok leaking the attachments to these vwcs as we will discard them
    return createContextFromRaw({
      windowWidth: createWritableValueWithCallbacks(window.innerWidth),
      windowHeight: createWritableValueWithCallbacks(window.innerHeight),
      pixelRatio: createWritableValueWithCallbacks(window.devicePixelRatio),
    })[0];
  }
  return val;
};
