import { ReactElement, ReactNode } from 'react';
import { LAYOUT } from '../../styles/layout';
import { Context } from '../../shared/context/Context';
import { combineClasses } from '../../shared/rendering/combineClasses';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';
import { COLOR_CLASSES } from '../../styles/colors';
import { HorizontalSpacer } from '../layout/HorizontalSpacer';
import { SPACERS } from '../../styles/spacers';
import { useWritableValueWithCallbacks } from '../../shared/callbacks/hooks/useWritableValueWithCallbacks';
import { WithVWC } from '../WithVWC';
import { RESETS } from '../../styles/resets';
import { setVWC } from '../../shared/callbacks/setVWC';

/**
 * Displays information like a job role compactly, especially when printing
 */
export const Experience = (props: {
  /** The prominent thing you want them to know. Will be assigned typography styles. */
  title: ReactNode;
  /** The most likely question they have about the thing. Will be assigned typography styles. */
  detail: ReactNode;
  /** Information they expect to be there but don't care about. Will be assigned typography styles.  */
  subtitle: ReactNode;
  /** Highlights you want them to take away. Will be assigned typography styles.  */
  highlight: ReactNode;
  /** Provides more info short enough they can scan it.  Will be assigned typography styles. */
  short: ReactNode;
  /** Provides more information if they are actually curious.  Will be assigned typography styles. */
  long: ReactNode;
  /** The context we are rendering within */
  context: Context;
}): ReactElement => {
  const expandedVWC = useWritableValueWithCallbacks(() => false);

  return (
    <div className={LAYOUT.column}>
      <div className={LAYOUT.rowWrap} style={{ alignItems: 'flex-end' }}>
        <div className={LAYOUT.row} style={{ alignItems: 'flex-end' }}>
          <div
            className={combineClasses(
              TYPOGRAPHY.title,
              TYPOGRAPHY_MODIFIERS.tight,
              COLOR_CLASSES.color.gray.dark
            )}
          >
            {props.title}
          </div>
          <HorizontalSpacer width={SPACERS.xsmall} />
          <div
            className={combineClasses(
              TYPOGRAPHY.fine,
              TYPOGRAPHY_MODIFIERS.tight,
              COLOR_CLASSES.color.gray.gray
            )}
          >
            {props.detail}
          </div>
        </div>
        <HorizontalSpacer width={0} flexGrow={1} />
        <div className={LAYOUT.row} style={{ alignItems: 'flex-end' }}>
          {props.subtitle !== undefined && (
            <>
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  TYPOGRAPHY_MODIFIERS.tight,
                  COLOR_CLASSES.color.gray.gray
                )}
              >
                {props.subtitle}
              </div>
              <HorizontalSpacer width={SPACERS.xxsmall} />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  TYPOGRAPHY_MODIFIERS.tight,
                  COLOR_CLASSES.color.gray.gray
                )}
              >
                |
              </div>
              <HorizontalSpacer width={SPACERS.xxsmall} />
            </>
          )}
          <div
            className={combineClasses(
              TYPOGRAPHY.fine,
              TYPOGRAPHY_MODIFIERS.tight,
              COLOR_CLASSES.color.gray.gray
            )}
          >
            {props.highlight}
          </div>
        </div>
      </div>
      <WithVWC
        value={props.context.printing}
        immediate
        component={(printing) =>
          printing ? (
            <div
              className={combineClasses(
                TYPOGRAPHY.fine,
                COLOR_CLASSES.color.gray.dark
              )}
            >
              {props.short}
            </div>
          ) : (
            <>
              <WithVWC
                value={expandedVWC}
                component={(expanded) =>
                  expanded ? (
                    <>
                      <div
                        className={combineClasses(
                          TYPOGRAPHY.body,
                          COLOR_CLASSES.color.gray.dark
                        )}
                      >
                        {props.long}
                      </div>
                    </>
                  ) : (
                    <div
                      className={combineClasses(
                        TYPOGRAPHY.fine,
                        COLOR_CLASSES.color.gray.dark
                      )}
                    >
                      {props.short}
                    </div>
                  )
                }
              />
              <button
                type="button"
                className={combineClasses(
                  RESETS.button,
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.primary.dark
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setVWC(expandedVWC, !expandedVWC.get());
                }}
              >
                <WithVWC
                  value={expandedVWC}
                  component={(expanded) =>
                    expanded ? <>Read less</> : <>Read more</>
                  }
                />
              </button>
            </>
          )
        }
      />
    </div>
  );
};
