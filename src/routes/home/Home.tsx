import { PropsWithChildren, ReactElement } from 'react';
import { COLOR_CLASSES, COLOR_VALUES } from '../../styles/colors';
import { useAttachedContext } from '../../shared/context/useAttachedContext';
import { FixedSize } from '../../components/layout/FixedSize';
import { LAYOUT } from '../../styles/layout';
import { combineClasses } from '../../shared/rendering/combineClasses';
import { OVERFLOW } from '../../styles/overflow';
import { TYPOGRAPHY, TYPOGRAPHY_MODIFIERS } from '../../styles/typography';
import { VerticalSpacer } from '../../components/layout/VerticalSpacer';
import { SPACERS } from '../../styles/spacers';
import { HorizontalSpacer } from '../../components/layout/HorizontalSpacer';
import { ParserUnfriendlyEmail } from '../../components/ParserUnfriendlyEmail';
import { WithVWC } from '../../components/WithVWC';
import { RESETS } from '../../styles/resets';
import { ValueWithCallbacks } from '../../shared/callbacks/ValueWithCallbacks';
import { PadSides } from '../../components/layout/PadSides';
import { Experience } from '../../components/specific/Experience';
import { Paragraph } from '../../components/specific/Paragraph';
import { ProjectTitleLine } from '../../components/specific/ProjectTitleLine';

/**
 * Printable resume; prints best around 800x1134
 */
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
      <PadSides context={context}>
        <div
          className={combineClasses(
            COLOR_CLASSES.border.gray.smoke,
            LAYOUT.column
          )}
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
          </div>
          <VerticalSpacer height={SPACERS.xsmall} />
          <div className={LAYOUT.row}>
            <div
              className={combineClasses(
                TYPOGRAPHY.fine,
                COLOR_CLASSES.color.gray.dark
              )}
            >
              Full Stack Engineer with 4-6 years of experience in Python,
              TypeScript, and SQL. Bonus DevOps responsibility in multiple
              roles. Have a Bachelor&rsquo;s of Arts in Mathematics from the
              University of Washington.
            </div>
          </div>
        </div>
      </PadSides>
      <SectionSep printing={context.printing} />
      <PadSides context={context}>
        <div className={LAYOUT.column}>
          <SectionTitle printing={context.printing}>Experience</SectionTitle>

          <Experience
            title="Full Stack Engineer"
            subtitle="Oseh"
            detail="Mar '22 - Nov '24"
            highlight={'TypeScript/Python'}
            context={context}
            short={
              <Paragraph small>
                Responsible for converting Figma designs into a single-page web
                application, an iOS App Store app, and an Android Play Store
                app. Used TypeScript (via React and React Native) on the
                frontend with Python and performant SQL on the backend.
                Additionally responsible for deploying and maintaining
                infrastructure as code (via Pulumi) to manage the cloud (AWS)
                resources.
              </Paragraph>
            }
            long={
              <>
                <Paragraph large>
                  Technical co-founder at an unsuccessful startup in the mental
                  wellness space. As the sole engineer, spun up infrastructure,
                  built an API backend, website frontend, and ios/android apps.
                </Paragraph>
                <VerticalSpacer height={SPACERS.small} />
                <Paragraph large>
                  The website / apps supported user authentication, subscription
                  billing, video, audio, images, suggestions for content based
                  on user ratings (1-4), and supported listing and filtering
                  content.
                </Paragraph>
                <VerticalSpacer height={SPACERS.small} />
                <Paragraph large>
                  The admin area allowed for extensive quick customization of
                  the website and app simultaneously, including the ability to
                  upload content (images, videos, audio files) that were
                  automatically optimized, change onboarding (add or remove
                  customizable screens), conduct surveys, request feedback,
                  change what parts of the app required a subscription, and
                  more.
                </Paragraph>
                <VerticalSpacer height={SPACERS.small} />
                <Paragraph large>
                  The app design was provided via Figma from the other
                  co-founders. View the code at{' '}
                  <a
                    href="https://github.com/meetoseh"
                    className={combineClasses(
                      RESETS.anchor,
                      COLOR_CLASSES.color.primary.dark
                    )}
                    style={{ display: 'inline' }}
                  >
                    github.com/meetoseh
                  </a>
                </Paragraph>
                <VerticalSpacer height={SPACERS.xsmall} />
                <Paragraph small>
                  Tools: Pulumi, Amazon Web Services (AWS) Elastic Load Balancer
                  (ELB), AWS Elastic Cloud Compute (EC2), Nginx, RQLite, Redis,
                  AWS Simple Storage Service (S3), AWS Simple Email Service
                  (SES), Twilio, Stripe, iOS App Store, Android Play Store,
                  Expo, GitHub, Git Large File Storage (LFS), ffmpeg, FastAPI,
                  Pydantic, React, React Native, JSON Web Tokens (JWT), OAuth,
                  Sign in with Google, Sign in with Apple, Passkeys, Websockets,
                  Python, Javascript, TypeScript, SQL, Git, Linux
                </Paragraph>
              </>
            }
          />
          <JobSpacer printing={context.printing} />
          <Experience
            title="Full Stack Engineer"
            subtitle="sourced by"
            detail="Aug '21 - Mar '22"
            highlight="TypeScript/Python"
            context={context}
            short={
              <Paragraph small>
                Responsible for converting Figma designs into a responsive web
                application. Used TypeScirpt (via React) on the frontend with
                Python and performant SQL on the backend. Additionally
                responsible for maintaining infrastructure as code (via Pulumi)
                to manage the cloud (AWS) resources.
              </Paragraph>
            }
            long={
              <>
                <Paragraph large>
                  Sole engineer at an unsuccessful startup in the food delivery
                  space. As the sole engineer, spun up infrastructure, built an
                  API backend, and built the website frontend.
                </Paragraph>
                <VerticalSpacer height={SPACERS.small} />
                <Paragraph large>
                  Users would purchase food delivery as follows: sourced by
                  would send them a text with a link. They would open the link
                  and see a suggested menu (~3 items) valid for the upcoming
                  week, to be made fresh to order in a commercial kitchen. They
                  would accept the order and pay via stripe, or they could write
                  back notes about what they didn't like which would be adjusted
                  on our side and they would get a new menu.
                </Paragraph>
                <VerticalSpacer height={SPACERS.small} />
                <Paragraph large>
                  During onboarding we would call the user and determine their
                  allergies and food preferences, which would be input into the
                  backend and used by the chef to build out menus as well as by
                  the admin area to help facilite building menus for users that
                  avoided allergens and matched preferences. Admin area also
                  assisted with print collateral, ordering ingredients,
                  marketing, and customer service.
                </Paragraph>
                <VerticalSpacer height={SPACERS.xsmall} />
                <Paragraph small>
                  Tools: Pulumi, Amazon Web Services (AWS) Elastic Load Balancer
                  (ELB), AWS Elastic Cloud Compute (EC2), Nginx, RQLite, Redis,
                  AWS Simple Storage Service (S3), AWS Simple Email Service
                  (SES), Twilio, Stripe, GitHub, FastAPI, Pydantic, React,
                  Python, Javascript, TypeScript, SQL, Git, Linux
                </Paragraph>
              </>
            }
          />
          <JobSpacer printing={context.printing} />
          <Experience
            title="Backend Engineer"
            subtitle="Alo Moves"
            detail="Oct '19 - Mar '21"
            highlight="Ruby on Rails"
            context={context}
            short={
              <Paragraph small>
                Responsible for building APIs to support product goals within an
                agile environment. Time evenly divided between optimizing and
                refactoring an existing codebase and building new features. Used
                Ruby on Rails and SQL.
              </Paragraph>
            }
            long={
              <>
                <Paragraph large>
                  Backend software engineer for existing Ruby on Rails project.
                  Helped stabilize performance and costs during a period of
                  rapid growth while accelerating feature development and
                  improving analytics.
                </Paragraph>
                <VerticalSpacer height={SPACERS.xsmall} />
                <Paragraph small>
                  Tools: Heroku, Postgres, Redis, memcached, Ruby on Rails,
                  Ruby, SQL, Git, Linux
                </Paragraph>
              </>
            }
          />
        </div>
      </PadSides>
      <SectionSep printing={context.printing} />
      <PadSides context={context}>
        <div className={LAYOUT.column}>
          <SectionTitle printing={context.printing}>Open Source</SectionTitle>
          <div
            className={combineClasses(
              TYPOGRAPHY.fine,
              COLOR_CLASSES.color.gray.dark
            )}
          >
            I'm always tinkering on something, and with over 90 public
            repositories going back to 2012, consisting mostly of my hobby
            projects and ideas, it's fun to look back to see what worked.
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
            A React application served via GitHub Pages that I print-to-pdf to
            get this resume.
          </div>
          <VerticalSpacer height={SPACERS.small} />
          <ProjectTitleLine title="rqdb" src="github.com/Tjstretchalot/rqdb" />
          <div
            className={combineClasses(
              TYPOGRAPHY.fine,
              COLOR_CLASSES.color.gray.dark
            )}
          >
            The rqlite client library built in Python and served via PyPi that I
            use in my commercial projects.
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
            My personal favorite project, built in college, which wraps ffmpeg
            in a convenient interface for creating animations programatically.
            It's especially focused on when frame generation is computationally
            expensive and many cores were available, as at the time I had access
            by request to the universities 64-core machines.
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
            My most starred project (50+ stars) has 2D math primitives for C#,
            intended for monogame projects.
          </div>
          <VerticalSpacer height={SPACERS.small} />
          <ProjectTitleLine
            title="LoansBot"
            src="https://github.com/LoansBot"
          />
          <div
            className={combineClasses(
              TYPOGRAPHY.fine,
              COLOR_CLASSES.color.gray.dark
            )}
          >
            The project with by far the most users; powers the reddit bot that
            serves the r/borrow subreddit. Originally written in Java, now has a
            website (https://redditloans.com) and is in Python/React.
          </div>
        </div>
      </PadSides>
      <SectionSep printing={context.printing} />
      <PadSides context={context}>
        <div className={LAYOUT.rowWrap}>
          <HorizontalSpacer width={0} flexGrow={1} />
          <div className={LAYOUT.rowWrap} style={{ gap: `${SPACERS.small}px` }}>
            <SkillLine title="SQL" duration="5yr" />
            <SkillLine title="Python" duration="4yr" />
            <SkillLine title="Typescript" duration="4yr" />
            <SkillLine title="AWS" duration="6yr" />
            <SkillLine title="Linux" duration="6yr" />
          </div>
          <HorizontalSpacer width={0} flexGrow={1} />
        </div>
      </PadSides>
      <WithVWC
        value={context.bottomPadding}
        component={(h) => <VerticalSpacer height={h} />}
      />
    </FixedSize>
  );
};

const SectionSep = (props: { printing: ValueWithCallbacks<boolean> }) => (
  <>
    <WithVWC
      value={props.printing}
      component={(printing) => (
        <VerticalSpacer
          height={printing ? SPACERS.xsmall : SPACERS.medium}
          flexGrow={1}
        />
      )}
      immediate
    />
    <div style={{ borderTop: `1px solid ${COLOR_VALUES.gray.smoke}` }} />
    <WithVWC
      value={props.printing}
      component={(printing) => (
        <VerticalSpacer
          height={printing ? SPACERS.xsmall : SPACERS.medium}
          flexGrow={1}
        />
      )}
      immediate
    />
  </>
);

const SectionTitle = (
  props: PropsWithChildren<{ printing: ValueWithCallbacks<boolean> }>
) => (
  <>
    <div
      className={combineClasses(
        TYPOGRAPHY.h3,
        COLOR_CLASSES.color.primary.dark
      )}
    >
      {props.children}
    </div>
    <WithVWC
      value={props.printing}
      component={(printing) => (
        <VerticalSpacer height={printing ? 0 : SPACERS.xsmall} />
      )}
      immediate
    />
  </>
);

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
  <div className={LAYOUT.row} style={{ alignItems: 'flex-end' }}>
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
    <HorizontalSpacer width={SPACERS.xxsmall} />
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
);
