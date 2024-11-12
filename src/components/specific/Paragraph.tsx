import { PropsWithChildren } from 'react';
import { combineClasses } from '../../shared/rendering/combineClasses';
import { COLOR_CLASSES } from '../../styles/colors';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';

/**
 * Convenience class for making body text in fine or body typography.
 */
export const Paragraph = (
  props: PropsWithChildren<
    | {
        small: true;
        large?: undefined;
      }
    | {
        small?: undefined;
        large: true;
      }
  >
) => {
  return (
    <div
      className={combineClasses(
        props.small ? TYPOGRAPHY.fine : TYPOGRAPHY.body,
        COLOR_CLASSES.color.gray.dark,
        TYPOGRAPHY_MODIFIERS.legibleMaxWidth
      )}
      style={{ alignSelf: 'flex-start' }}
    >
      {props.children}
    </div>
  );
};
