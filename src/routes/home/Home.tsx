import { ReactElement } from 'react';
import { COLOR_CLASSES } from '../../styles/colors';
import { useAttachedContext } from '../../shared/context/useAttachedContext';
import { FixedSize } from '../../components/layout/FixedSize';
import { LAYOUT } from '../../styles/layout';
import { combineClasses } from '../../shared/rendering/combineClasses';
import { OVERFLOW } from '../../styles/overflow';
import { Padded } from '../../components/layout/Padded';

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
    >
      <Padded
        top={context.topPadding}
        left={context.leftPadding}
        right={context.rightPadding}
        bottom={context.bottomPadding}
      >
        <div className={COLOR_CLASSES.color.gray.dark}>
          Hello world! It's Home. Getting somewhere!
        </div>
      </Padded>
    </FixedSize>
  );
};
