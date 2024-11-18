import { createWritableValueWithCallbacks } from '../callbacks/createWritableValueWithCallbacks';
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
  const printingMediaRule = window.matchMedia('print');
  const printingVWC = createWritableValueWithCallbacks(
    printingMediaRule.matches
  );

  const onResize = () => {
    const printing = printingMediaRule.matches;
    const size = printing
      ? {
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        }
      : { width: window.innerWidth, height: window.innerHeight };
    const pixelRatio = printing
      ? window.devicePixelRatio
      : window.devicePixelRatio;

    const widthChanged = windowWidthVWC.get() !== size.width;
    const heightChanged = windowHeightVWC.get() !== size.height;
    const pixelRatioChanged = pixelRatioVWC.get() !== pixelRatio;
    const printingChanged = printingVWC.get() !== printing;

    windowWidthVWC.set(size.width);
    windowHeightVWC.set(size.height);
    pixelRatioVWC.set(pixelRatio);
    printingVWC.set(printing);

    if (widthChanged) {
      windowWidthVWC.callbacks.call();
    }

    if (heightChanged) {
      windowHeightVWC.callbacks.call();
    }

    if (pixelRatioChanged) {
      pixelRatioVWC.callbacks.call();
    }

    if (printingChanged) {
      printingVWC.callbacks.call();
    }
  };

  const recheckPrinting = () => {
    if (printingVWC.get() !== printingMediaRule.matches) {
      onResize();
    }
  };

  window.addEventListener('resize', onResize);
  printingMediaRule.addEventListener('change', recheckPrinting);
  window.addEventListener('beforeprint', recheckPrinting);
  window.addEventListener('afterprint', recheckPrinting);

  return [
    {
      windowWidth: windowWidthVWC,
      windowHeight: windowHeightVWC,
      pixelRatio: pixelRatioVWC,
      printing: printingVWC,
    },
    () => {
      window.removeEventListener('resize', onResize);
      printingMediaRule.removeEventListener('change', recheckPrinting);
      window.removeEventListener('beforeprint', recheckPrinting);
      window.removeEventListener('afterprint', recheckPrinting);
    },
  ];
};
