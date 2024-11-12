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
 * Cover letter for Microsoft's "Full Stack Web Developer - Gaming" position
 */
export const MicrosoftCover = (): ReactElement => {
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
                          href="https://mtimothy.com/microsoft"
                          className={combineClasses(
                            RESETS.anchor,
                            TYPOGRAPHY.fine,
                            TYPOGRAPHY_MODIFIERS.tight,
                            COLOR_CLASSES.color.primary.dark
                          )}
                        >
                          mtimothy.com/microsoft
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
        I&rsquo;m interested in the Full Stack Web Developer position. I have
        broad and extensive experience building and shipping digital products
        with HTML5, CSS3, and JavaScript. Though I've recently used React and
        FastAPI, I&rsquo;m excited to work within a LAMP stack.
      </Paragraph>
      <VerticalSpacer height={SPACERS.small} />
      <Paragraph context={context}>
        I&rsquo;m a strong, immediate value add for the XGSP team. I will
        rapidly deliver high quality, documented commits within the core LAMP
        stack. Further, because I have practice configuring NPM/webpack/eslint I
        can quickly implement any developer experience improvements that have
        been delayed or come up. Finally, I&rsquo;m happy to embrace any
        testing, code review, or style guides that the team has adopted.
      </Paragraph>
      <VerticalSpacer height={SPACERS.small} />
      <Paragraph context={context}>
        Culturally I&rsquo;m a likely fit as I already live nearby, I&rsquo;m a
        life-long gamer and Windows user, and I have a generally positive, calm,
        and focused demeanor.
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
