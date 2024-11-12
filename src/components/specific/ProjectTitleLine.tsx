import { combineClasses } from '../../shared/rendering/combineClasses';
import { COLOR_CLASSES } from '../../styles/colors';
import { LAYOUT } from '../../styles/layout';
import { RESETS } from '../../styles/resets';
import { SPACERS } from '../../styles/spacers';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';
import { HorizontalSpacer } from '../layout/HorizontalSpacer';

/**
 * Shows a title and link one one line (wrapping if not enough space), with
 * the whole thing linking to the src url.
 */
export const ProjectTitleLine = (props: { title: string; src: string }) => (
  <a
    href={`https://${props.src}`}
    className={RESETS.anchor}
    target="_blank"
    rel="noreferrer"
  >
    <div className={LAYOUT.rowWrap} style={{ alignItems: 'flex-end' }}>
      <div
        className={combineClasses(
          TYPOGRAPHY.title,
          TYPOGRAPHY_MODIFIERS.tight,
          COLOR_CLASSES.color.gray.dark
        )}
      >
        {props.title}
      </div>
      <HorizontalSpacer width={0} maxWidth={SPACERS.small} flexGrow={1} />
      <div
        className={combineClasses(
          TYPOGRAPHY.fine,
          TYPOGRAPHY_MODIFIERS.tight,
          COLOR_CLASSES.color.gray.gray
        )}
      >
        {props.src}
      </div>
    </div>
  </a>
);
