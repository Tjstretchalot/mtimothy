import { ReactElement, ReactNode } from 'react';
import { Padded } from './Padded';
import { constantVWC } from '../../shared/callbacks/constantVWC';
import { Context } from '../../shared/context/Context';

/**
 * Convenience version of Padded which pads the left and right sides
 * with the standard context padding.
 */
export const PadSides = (props: {
  context: Context;
  children: ReactNode;
}): ReactElement => (
  <Padded
    left={props.context.leftPadding}
    right={props.context.rightPadding}
    top={constantVWC(0)}
    bottom={constantVWC(0)}
  >
    {props.children}
  </Padded>
);
