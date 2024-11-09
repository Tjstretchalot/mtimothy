import { ReactElement } from 'react';
import { Context } from '../shared/context/Context';
import { useAttachedContext } from '../shared/context/useAttachedContext';

/**
 * Convenience component to attach a screen context and forward it to the children. Only
 * intended to be used at the root level
 */
export const WithContext = (props: {
  component: (context: Context) => ReactElement;
}) => {
  const context = useAttachedContext();
  return props.component(context);
};
