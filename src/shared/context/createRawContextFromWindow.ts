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
  const printingMediaRule = window.matchMedia('print');
  const printingVWC = createWritableValueWithCallbacks(
    printingMediaRule.matches
  );

  const onResize = () => {
    setVWC(windowWidthVWC, window.innerWidth);
    setVWC(windowHeightVWC, window.innerHeight);
    setVWC(pixelRatioVWC, window.devicePixelRatio);
  };

  const recheckPrinting = () => {
    setVWC(printingVWC, printingMediaRule.matches);
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
