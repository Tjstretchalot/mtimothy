import { useEffect } from 'react';
import { withVWC } from '../withVWC';
import { ValueWithCallbacks } from '../ValueWithCallbacks';

/**
 * Convenience hook that calls the handler with the value when it changes
 * (and immediately). This is essentially just the hook equivalent of withVWC.
 */
export const useVWC = <T>(
  value: ValueWithCallbacks<T>,
  handler: (value: T) => void
) => {
  useEffect(() => withVWC(value, handler), [value, handler]);
};
