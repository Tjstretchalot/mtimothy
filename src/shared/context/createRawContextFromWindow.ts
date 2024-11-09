import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
import { setVWC } from '../callbacks/setVWC';
import { ContextRaw } from './ContextRaw';

/**
 * Creates a new raw context based on the window object. Can be detached using
 * the second return value.
 */
export const createRawContextFromWindow = (): [ContextRaw, () => void] => {
  const windowWidthVWC = createWritableValueWithCallbacks(window.innerWidth);
  const windowHeightVWC = createWritableValueWithCallbacks(window.innerHeight);
  const pixelRatioVWC = createWritableValueWithCallbacks(
    window.devicePixelRatio
  );

  const onResize = () => {
    setVWC(windowWidthVWC, window.innerWidth);
    setVWC(windowHeightVWC, window.innerHeight);
    setVWC(pixelRatioVWC, window.devicePixelRatio);
  };

  window.addEventListener('resize', onResize);

  return [
    {
      windowWidth: windowWidthVWC,
      windowHeight: windowHeightVWC,
      pixelRatio: pixelRatioVWC,
    },
    () => {
      window.removeEventListener('resize', onResize);
    },
  ];
};
