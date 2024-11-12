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
 * Cover letter for Dells's "Software Engineer" position
 */
export const DellCover = (): ReactElement => {
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
                          href="https://mtimothy.com/dell"
                          className={combineClasses(
                            RESETS.anchor,
                            TYPOGRAPHY.fine,
                            TYPOGRAPHY_MODIFIERS.tight,
                            COLOR_CLASSES.color.primary.dark
                          )}
                        >
                          mtimothy.com/dell
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
        I&rsquo;m interested in the Software Engineer position within the
        FileSystems and DataServices team. I have broad and extensive experience
        building and shipping digital products with HTML5, CSS3, and JavaScript.
        I&rsquo;m confident I can quickly adapt to the C/C++ stack.
      </Paragraph>
      <VerticalSpacer height={SPACERS.small} />
      <Paragraph context={context}>
        I have a strong knack for distributed systems, data structures, and
        algorithms. I am strongly proficient in the linux command line, I have
        worked previously in C#, and I have dipped my toes into C++/Rust. Most
        importantly, I can absorb knowledge, styles, and practices to quickly
        make the ideal commits for Dell specifically, not just the industry at
        large.
      </Paragraph>
      <VerticalSpacer height={SPACERS.small} />
      <Paragraph context={context}>
        Culturally I&rsquo;m a likely fit as I already live nearby, I&rsquo;m
        flexible with regard to remote or in person, and I have a generally
        positive, calm, and focused demeanor.
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
