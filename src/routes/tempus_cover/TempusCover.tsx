import { PropsWithChildren, ReactElement } from 'react';
import { WithVWC } from '../../components/WithVWC';
import { COLOR_CLASSES } from '../../styles/colors';
import { LAYOUT } from '../../styles/layout';
import { OVERFLOW } from '../../styles/overflow';
import { combineClasses } from '../../shared/rendering/combineClasses';
import { useAttachedContext } from '../../shared/context/useAttachedContext';
import { FixedSize } from '../../components/layout/FixedSize';
import { VerticalSpacer } from '../../components/layout/VerticalSpacer';
import { SPACERS } from '../../styles/spacers';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';
import { RESETS } from '../../styles/resets';
import { HorizontalSpacer } from '../../components/layout/HorizontalSpacer';
import { ParserUnfriendlyEmail } from '../../components/ParserUnfriendlyEmail';
import { Context } from '../../shared/context/Context';
import { PadSides } from '../../components/layout/PadSides';

/**
 * Cover letter for Tempus's "Software Engineer" position
 */
export const TempusCover = (): ReactElement => {
  const context = useAttachedContext();

  return (
    <FixedSize
      width={context.windowWidth}
      height={context.windowHeight}
      className={combineClasses(
        COLOR_CLASSES.background.gray.light,
        LAYOUT.column,
        OVERFLOW.autoY
      )}
      allowParentToReflow
    >
      <WithVWC
        value={context.topPadding}
        component={(h) => <VerticalSpacer height={h} />}
      />
      <PadSides context={context}>
        <div
          className={combineClasses(
            COLOR_CLASSES.border.gray.smoke,
            LAYOUT.column
          )}
          style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
        >
          <div className={LAYOUT.row}>
            <div className={LAYOUT.rowWrap} style={{ flexGrow: 1 }}>
              <div className={LAYOUT.column}>
                <VerticalSpacer height={0} flexGrow={1} />
                <div
                  className={combineClasses(
                    COLOR_CLASSES.color.primary.dark,
                    TYPOGRAPHY_MODIFIERS.tight,
                    TYPOGRAPHY.h1
                  )}
                >
                  Timothy Moore
                </div>
              </div>
              <HorizontalSpacer width={0} flexGrow={1} />
              <div className={LAYOUT.column}>
                <VerticalSpacer height={SPACERS.small} flexGrow={1} />
                <div
                  className={combineClasses(
                    COLOR_CLASSES.color.gray.gray,
                    TYPOGRAPHY_MODIFIERS.tight,
                    TYPOGRAPHY.body
                  )}
                >
                  <ParserUnfriendlyEmail />
                </div>
              </div>
            </div>

            <WithVWC
              value={context.printing}
              component={(printing) =>
                !printing ? (
                  <></>
                ) : (
                  <>
                    <div className={LAYOUT.column}>
                      <VerticalSpacer height={0} flexGrow={1} />
                      <div className={LAYOUT.row}>
                        <div
                          className={combineClasses(
                            TYPOGRAPHY.fine,
                            TYPOGRAPHY_MODIFIERS.tight,
                            TYPOGRAPHY_MODIFIERS.noWrap,
                            COLOR_CLASSES.color.gray.dark
                          )}
                        >
                          Viewable at
                        </div>
                        <HorizontalSpacer width={SPACERS.xxsmall} />
                        <a
                          href="https://mtimothy.com/tempus"
                          className={combineClasses(
                            RESETS.anchor,
                            TYPOGRAPHY.fine,
                            TYPOGRAPHY_MODIFIERS.tight,
                            COLOR_CLASSES.color.primary.dark
                          )}
                        >
                          mtimothy.com/tempus
                        </a>
                      </div>
                      <VerticalSpacer height={0} flexGrow={1} />
                    </div>
                    <HorizontalSpacer width={0} flexGrow={1} />
                  </>
                )
              }
              immediate
            />
          </div>
          <VerticalSpacer height={SPACERS.medium} />
        </div>
      </PadSides>
      <VerticalSpacer height={SPACERS.medium} flexGrow={1} />
      <Paragraph context={context}>To whom it may concern,</Paragraph>
      <VerticalSpacer height={SPACERS.large} />
      <Paragraph context={context}>
        I&rsquo;m interested in the Software Engineer II position in Chicago.
        I&rsquo;ve got software development experience in frontend
        (JS/TS/React/React Native) and backend (Python/Ruby), so I can join the
        team and quickly get started. Furthermore, I have extensively used
        relational databases (SQLite/Postgres), pub/sub (via Redis), and cloud
        infrastructure (AWS/Pulumi).
      </Paragraph>
      <VerticalSpacer height={SPACERS.small} />
      <Paragraph context={context}>
        This knowledge makes me a powerful asset if I join the team, but the
        most important reason to do so is collaboration and communication.
        I&rsquo;m excited to share what I know, and even more eager to meet and
        learn from the developers, designers, scientists, and product managers
        at Tempus!
      </Paragraph>
      <VerticalSpacer height={SPACERS.large} />
      <Paragraph context={context}>Sincerely,</Paragraph>
      <VerticalSpacer height={SPACERS.small} />
      <Paragraph context={context}>Timothy Moore</Paragraph>
      <VerticalSpacer height={SPACERS.medium} flexGrow={1} />
    </FixedSize>
  );
};

const Paragraph = ({
  context,
  children,
}: PropsWithChildren<{
  context: Context;
}>) => (
  <PadSides context={context}>
    <div
      className={combineClasses(TYPOGRAPHY.body, COLOR_CLASSES.color.gray.dark)}
    >
      {children}
    </div>
  </PadSides>
);
