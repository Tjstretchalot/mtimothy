import { combineClasses } from '../../shared/rendering/combineClasses';
import { COLOR_CLASSES } from '../../styles/colors';
import { LAYOUT } from '../../styles/layout';
import { SPACERS } from '../../styles/spacers';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';

/**
 * Displays a sequence of tags in fine, gray font with a gap between each.
 */
export const Tags = (props: { tags: string[] }) => (
  <div className={LAYOUT.rowWrap} style={{ gap: `${SPACERS.xsmall}px` }}>
    {props.tags.map((tag, i) => (
      <div
        key={i}
        className={combineClasses(
          TYPOGRAPHY.fine,
          TYPOGRAPHY_MODIFIERS.tight,
          COLOR_CLASSES.color.gray.gray
        )}
      >
        {tag}
      </div>
    ))}
  </div>
);
