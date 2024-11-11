import { Fragment, ReactElement } from 'react';
import { COLOR_CLASSES, COLOR_VALUES } from '../../styles/colors';
import { useAttachedContext } from '../../shared/context/useAttachedContext';
import { FixedSize } from '../../components/layout/FixedSize';
import { LAYOUT } from '../../styles/layout';
import { combineClasses } from '../../shared/rendering/combineClasses';
import { OVERFLOW } from '../../styles/overflow';
import { Padded } from '../../components/layout/Padded';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';
import { VerticalSpacer } from '../../components/layout/VerticalSpacer';
import { SPACERS } from '../../styles/spacers';
import { HorizontalSpacer } from '../../components/layout/HorizontalSpacer';
import { ParserUnfriendlyEmail } from '../../components/ParserUnfriendlyEmail';
import { WIDTH_BREAKPOINTS } from '../../styles/breakpoints';
import { WithVWC } from '../../components/WithVWC';
import { constantVWC } from '../../shared/callbacks/constantVWC';
import { RowOrColumn } from '../../components/layout/RowOrColumn';
import { RESETS } from '../../styles/resets';
import { ValueWithCallbacks } from '../../shared/callbacks/ValueWithCallbacks';
import { useWritableValueWithCallbacks } from '../../shared/callbacks/hooks/useWritableValueWithCallbacks';
import { useMapManyVWC } from '../../shared/callbacks/hooks/useMapManyVWC';
import { setVWC } from '../../shared/callbacks/setVWC';
import { Context } from '../../shared/context/Context';

export const Home = (): ReactElement => {
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
      <Padded
        left={context.leftPadding}
        right={context.rightPadding}
        top={constantVWC(0)}
        bottom={constantVWC(0)}
      >
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
                          href="https://mtimothy.com"
                          className={combineClasses(
                            RESETS.anchor,
                            TYPOGRAPHY.fine,
                            TYPOGRAPHY_MODIFIERS.tight,
                            COLOR_CLASSES.color.primary.dark
                          )}
                        >
                          mtimothy.com
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
      </Padded>
      <RowOrColumn
        width={context.windowWidth}
        breakpoint={WIDTH_BREAKPOINTS[0] * 2 + SPACERS.small * 2 + 1}
        flex={(_isVertical) => ({
          grow: 0,
          shrink: 0,
          basis: 'auto',
        })}
        gapBetweenColumns={(_isVertical, key) => (
          <Fragment key={key}>
            <div
              style={{
                borderLeft: `1px solid ${COLOR_VALUES.gray.smoke}`,
              }}
            />
          </Fragment>
        )}
        gapBetweenRows={(_isVertical, key) => (
          <Fragment key={key}>
            <div
              style={{
                borderTop: `1px solid ${COLOR_VALUES.gray.smoke}`,
              }}
            />
          </Fragment>
        )}
        firstColumn={(_isVertical) => (
          <Fragment key="firstColumn">
            <WithVWC
              value={context.leftPadding}
              component={(w) => <HorizontalSpacer width={w} />}
            />
          </Fragment>
        )}
        lastColumn={(_isVertical) => (
          <Fragment key="lastColumn">
            <WithVWC
              value={context.rightPadding}
              component={(w) => <HorizontalSpacer width={w} />}
            />
          </Fragment>
        )}
        firstRow={(_isVertical) => <Fragment key="firstRow"></Fragment>}
        lastRow={(_isVertical) => <Fragment key="lastRow"></Fragment>}
        items={(isVertical) => [
          <div key={0} className={LAYOUT.column} style={{ flexGrow: 1 }}>
            <VerticalSpacer height={SPACERS.medium} />
            <div
              className={LAYOUT.column}
              style={{ paddingRight: `${isVertical ? 0 : SPACERS.medium}px` }}
            >
              <div
                className={combineClasses(
                  TYPOGRAPHY.h3,
                  COLOR_CLASSES.color.primary.dark
                )}
              >
                Experience
              </div>

              <VerticalSpacer height={SPACERS.small} />
              <Job
                title="Oseh"
                date="Mar '22 - Nov '24"
                tags={['JS', 'Python']}
                context={context}
                description={{
                  short: (
                    <JobBodyParagraph small>
                      Sole engineer; built website + mobile apps
                    </JobBodyParagraph>
                  ),
                  long: (
                    <>
                      <JobBodyParagraph large>
                        Technical co-founder at an unsuccessful startup in the
                        mental wellness space. As the sole engineer, spun up
                        infrastructure, built an API backend, website frontend,
                        and ios/android apps.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.small} />
                      <JobBodyParagraph large>
                        The website / apps supported user authentication,
                        subscription billing, video, audio, images, suggestions
                        for content based on user ratings (1-4), and supported
                        listing and filtering content.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.small} />
                      <JobBodyParagraph large>
                        The admin area allowed for extensive quick customization
                        of the website and app simultaneously, including the
                        ability to upload content (images, videos, audio files)
                        that were automatically optimized, change onboarding
                        (add or remove customizable screens), conduct surveys,
                        request feedback, change what parts of the app required
                        a subscription, and more.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.small} />
                      <JobBodyParagraph large>
                        The app design was provided via Figma from the other
                        co-founders. The source code is available in the
                        Projects section.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.xsmall} />
                      <JobBodyParagraph small>
                        Tools: Pulumi, Amazon Web Services (AWS) Elastic Load
                        Balancer (ELB), AWS Elastic Cloud Compute (EC2), Nginx,
                        RQLite, Redis, AWS Simple Storage Service (S3), AWS
                        Simple Email Service (SES), Twilio, Stripe, iOS App
                        Store, Android Play Store, Expo, GitHub, Git Large File
                        Storage (LFS), ffmpeg, FastAPI, Pydantic, React, React
                        Native, JSON Web Tokens (JWT), OAuth, Sign in with
                        Google, Sign in with Apple, Passkeys, Websockets,
                        Python, Javascript, TypeScript, SQL, Git, Linux
                      </JobBodyParagraph>
                    </>
                  ),
                }}
              />
              <JobSpacer printing={context.printing} />
              <Job
                title="Sourced By"
                date="Aug '21 - Mar '22"
                tags={['JS', 'Python']}
                context={context}
                description={{
                  short: (
                    <JobBodyParagraph small>
                      Sole engineer; built the website
                    </JobBodyParagraph>
                  ),
                  long: (
                    <>
                      <JobBodyParagraph large>
                        Sole engineer at an unsuccessful startup in the food
                        delivery space. As the sole engineer, spun up
                        infrastructure, built an API backend, and built the
                        website frontend.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.small} />
                      <JobBodyParagraph large>
                        Users would purchase food delivery as follows: sourced
                        by would send them a text with a link. They would open
                        the link and see a suggested menu (~3 items) valid for
                        the upcoming week, to be made fresh to order in a
                        commercial kitchen. They would accept the order and pay
                        via stripe, or they could write back notes about what
                        they didn't like which would be adjusted on our side and
                        they would get a new menu.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.small} />
                      <JobBodyParagraph large>
                        During onboarding we would call the user and determine
                        their allergies and food preferences, which would be
                        input into the backend and used by the chef to build out
                        menus as well as by the admin area to help facilite
                        building menus for users that avoided allergens and
                        matched preferences. Admin area also assisted with print
                        collateral, ordering ingredients, marketing, and
                        customer service.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.xsmall} />
                      <JobBodyParagraph small>
                        Tools: Pulumi, Amazon Web Services (AWS) Elastic Load
                        Balancer (ELB), AWS Elastic Cloud Compute (EC2), Nginx,
                        RQLite, Redis, AWS Simple Storage Service (S3), AWS
                        Simple Email Service (SES), Twilio, Stripe, GitHub,
                        FastAPI, Pydantic, React, Python, Javascript,
                        TypeScript, SQL, Git, Linux
                      </JobBodyParagraph>
                    </>
                  ),
                }}
              />
              <JobSpacer printing={context.printing} />
              <Job
                title="Alo Moves"
                date="Oct '19 - Mar '21"
                tags={['Ruby']}
                context={context}
                description={{
                  short: (
                    <JobBodyParagraph small>
                      Backend software engineer in a team of 5
                    </JobBodyParagraph>
                  ),
                  long: (
                    <>
                      <JobBodyParagraph large>
                        Backend software engineer for existing Ruby on Rails
                        project. Helped stabilize performance and costs during a
                        period of rapid growth while accelerating feature
                        development and improving analytics.
                      </JobBodyParagraph>
                      <VerticalSpacer height={SPACERS.xsmall} />
                      <JobBodyParagraph small>
                        Tools: Heroku, Postgres, Redis, memcached, Ruby on
                        Rails, Ruby, SQL, Git, Linux
                      </JobBodyParagraph>
                    </>
                  ),
                }}
              />
            </div>
            <VerticalSpacer height={SPACERS.medium} />
            <div
              style={{ borderTop: `1px solid ${COLOR_VALUES.gray.smoke}` }}
            />
            <VerticalSpacer height={SPACERS.medium} />
            <div
              className={LAYOUT.column}
              style={{ paddingRight: `${isVertical ? 0 : SPACERS.medium}px` }}
            >
              <div
                className={combineClasses(
                  TYPOGRAPHY.h3,
                  TYPOGRAPHY_MODIFIERS.noWrap,
                  TYPOGRAPHY_MODIFIERS.tight,
                  COLOR_CLASSES.color.primary.dark
                )}
              >
                Projects
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <ProjectTitleLine
                title="mtimothy.com"
                src="github.com/Tjstretchalot/mtimothy"
              />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.gray.dark
                )}
              >
                Personal website, including this resume
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <ProjectTitleLine title="oseh.io" src="github.com/meetoseh" />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.gray.dark
                )}
              >
                JS/Python full stack
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <ProjectTitleLine
                title="rqdb"
                src="github.com/Tjstretchalot/rqdb"
              />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.gray.dark
                )}
              >
                Python client for rqlite
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <ProjectTitleLine
                title="pympanim"
                src="github.com/Tjstretchalot/pympanim"
              />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.gray.dark
                )}
              >
                Python library to generate videos
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <ProjectTitleLine
                title="SharpMath2"
                src="github.com/Tjstretchalot/SharpMath2"
              />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.gray.dark
                )}
              >
                C# math library for 2D collision detection
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <ProjectTitleLine
                title="AnyAnglePathfinding"
                src="github.com/Tjstretchalot/AnyAnglePathfinding"
              />
              <div
                className={combineClasses(
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.gray.dark
                )}
              >
                C# any-angle pathfinding algorithm
              </div>
            </div>
            <VerticalSpacer height={SPACERS.medium} />
          </div>,
          <div key={1} className={LAYOUT.column} style={{ flexGrow: 0 }}>
            <VerticalSpacer height={SPACERS.medium} />
            <div
              className={LAYOUT.column}
              style={{
                paddingLeft: `${isVertical ? 0 : SPACERS.medium}px`,
                flexGrow: 1,
              }}
            >
              <VerticalSpacer height={0} flexGrow={1} />
              <div
                className={combineClasses(
                  TYPOGRAPHY.h3,
                  COLOR_CLASSES.color.primary.dark
                )}
              >
                Skills
              </div>
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="SQL" duration="5yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Python" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Javascript" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Typescript" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Ruby" duration="1yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="C#" duration="1yr" />
              <VerticalSpacer height={SPACERS.medium} />
              <SkillLine title="Pulumi" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Terraform" duration="<1yr" />
              <VerticalSpacer height={SPACERS.medium} />
              <SkillLine title="React" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="FastAPI" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="React Native" duration="2yr" />
              <VerticalSpacer height={SPACERS.medium} />
              <SkillLine title="SQLite" duration="4yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Postgres" duration="1yr" />
              <VerticalSpacer height={SPACERS.medium} />
              <SkillLine title="AWS" duration="6yr" />
              <VerticalSpacer height={SPACERS.small} />
              <SkillLine title="Linux" duration="6yr" />
              <VerticalSpacer
                height={isVertical ? SPACERS.medium : 0}
                flexGrow={1}
              />
            </div>
          </div>,
        ]}
      />
      <div className={LAYOUT.row}>
        <WithVWC
          value={context.leftPadding}
          component={(w) => <HorizontalSpacer width={w} />}
        />
        <div
          style={{
            borderTop: `1px solid ${COLOR_VALUES.gray.smoke}`,
            flexGrow: 1,
          }}
        />
        <WithVWC
          value={context.rightPadding}
          component={(w) => <HorizontalSpacer width={w} />}
        />
      </div>
      <VerticalSpacer height={SPACERS.medium} />
      <Padded
        left={context.leftPadding}
        right={context.rightPadding}
        top={constantVWC(0)}
        bottom={constantVWC(0)}
      >
        <div
          className={combineClasses(
            COLOR_CLASSES.color.gray.gray,
            TYPOGRAPHY.fine
          )}
        >
          Currently live in Greater Seattle Area, WA. US Citizen (born in US).
          Willing to relocate. Open to remote or in-person.
        </div>
      </Padded>

      <WithVWC
        value={context.bottomPadding}
        component={(h) => <VerticalSpacer height={h} />}
      />
    </FixedSize>
  );
};

const Job = (props: {
  title: string;
  date: string;
  tags: string[];
  context: Context;
  description: {
    short: ReactElement;
    long: ReactElement;
  };
}): ReactElement => (
  <>
    <JobTitleLine title={props.title} date={props.date} tags={props.tags} />
    <JobBodySwapper
      printing={props.context.printing}
      short={props.description.short}
      long={props.description.long}
    />
  </>
);

const JobTitleLine = (props: {
  title: string;
  date: string;
  tags?: string[];
}) => (
  <div className={LAYOUT.rowWrap}>
    <div
      className={combineClasses(
        TYPOGRAPHY.title,
        TYPOGRAPHY_MODIFIERS.tight,
        COLOR_CLASSES.color.gray.dark
      )}
    >
      {props.title}
    </div>
    <HorizontalSpacer
      width={SPACERS.xxsmall}
      flexGrow={1}
      maxWidth={SPACERS.xsmall}
    />
    <div className={LAYOUT.column}>
      <VerticalSpacer height={0} flexGrow={1} />
      <div
        className={combineClasses(
          TYPOGRAPHY.fine,
          TYPOGRAPHY_MODIFIERS.tight,
          COLOR_CLASSES.color.gray.gray
        )}
      >
        {props.date}
      </div>
    </div>
    {props.tags !== undefined && props.tags.length > 0 && (
      <>
        <HorizontalSpacer width={SPACERS.xxsmall} flexGrow={1} />
        <div className={LAYOUT.column}>
          <VerticalSpacer height={0} flexGrow={1} />
          <JobTags tags={props.tags} />
        </div>
      </>
    )}
  </div>
);

const JobTags = (props: { tags: string[] }) => (
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

const JobBodySwapper = (props: {
  printing: ValueWithCallbacks<boolean>;
  short: ReactElement;
  long: ReactElement;
}) => {
  const readMoreVWC = useWritableValueWithCallbacks<boolean>(() => false);
  const usingSmallVWC = useMapManyVWC(
    [props.printing, readMoreVWC],
    () => props.printing.get() || !readMoreVWC.get(),
    { immediate: true }
  );

  return (
    <>
      <WithVWC
        value={usingSmallVWC}
        component={(small) =>
          small ? (
            props.short
          ) : (
            <>
              <VerticalSpacer height={SPACERS.xxsmall} />
              {props.long}
            </>
          )
        }
        immediate
      />

      <WithVWC
        value={props.printing}
        component={(printing) =>
          printing ? (
            <></>
          ) : (
            <>
              <button
                type="button"
                className={combineClasses(
                  RESETS.button,
                  TYPOGRAPHY.fine,
                  COLOR_CLASSES.color.primary.dark
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setVWC(readMoreVWC, !readMoreVWC.get());
                }}
              >
                <WithVWC
                  value={readMoreVWC}
                  component={(readMore) =>
                    readMore ? <>Read less</> : <>Read more</>
                  }
                />
              </button>
            </>
          )
        }
        immediate
      />
    </>
  );
};

const JobBodyParagraph = (
  props: {
    children: string;
  } & (
    | {
        small: true;
        large?: undefined;
      }
    | {
        small?: undefined;
        large: true;
      }
  )
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

const JobSpacer = (props: { printing: ValueWithCallbacks<boolean> }) => (
  <WithVWC
    value={props.printing}
    component={(printing) => (
      <VerticalSpacer height={printing ? SPACERS.small : SPACERS.medium} />
    )}
    immediate
  />
);

const SkillLine = (props: { title: string; duration: string }) => (
  <div className={LAYOUT.row}>
    <div className={LAYOUT.column}>
      <VerticalSpacer height={0} flexGrow={1} />
      <div
        className={combineClasses(
          TYPOGRAPHY.title,
          TYPOGRAPHY_MODIFIERS.tight,
          TYPOGRAPHY_MODIFIERS.noWrap,
          COLOR_CLASSES.color.gray.dark
        )}
      >
        {props.title}
      </div>
    </div>
    <HorizontalSpacer width={SPACERS.medium} flexGrow={1} />
    <div className={LAYOUT.column}>
      <VerticalSpacer height={0} flexGrow={1} />
      <div
        className={combineClasses(
          TYPOGRAPHY.fine,
          TYPOGRAPHY_MODIFIERS.tight,
          TYPOGRAPHY_MODIFIERS.noWrap,
          COLOR_CLASSES.color.gray.gray
        )}
      >
        {props.duration}
      </div>
    </div>
  </div>
);

const ProjectTitleLine = (props: { title: string; src: string }) => (
  <a
    href={`https://${props.src}`}
    className={RESETS.anchor}
    target="_blank"
    rel="noreferrer"
  >
    <JobTitleLine title={props.title} date={props.src} />
  </a>
);
