import { ReactElement, useCallback } from 'react';
import { ValueWithCallbacks } from '../../shared/callbacks/ValueWithCallbacks';
import { useMappedVWC } from '../../shared/callbacks/hooks/useMappedVWC';
import { WithVWC } from '../WithVWC';
import { LAYOUT } from '../../styles/layout';

export type RowOrColumnProps = {
  /** The actual width of the container */
  width: ValueWithCallbacks<number>;

  /**
   * If we are below this width its rendered as a column,
   * above this width is rendered as a row
   */
  breakpoint: number;

  /**
   * The flex values for this container; typically, this is rendered
   * within a column layout, so this is deciding if we should expand to take
   * up additional vertical space.
   */
  flex: (isVertical: boolean) => {
    grow: number;
    shrink: number;
    basis: number | 'auto';
  };

  /** Regardless of if the items are in a row or column, the first column */
  firstColumn: (isVertical: boolean) => ReactElement;

  /** Regardless of if the items are in a row or column, the last column */
  lastColumn: (isVertical: boolean) => ReactElement;

  /** Regardless of if the items are in a row or column, the first row */
  firstRow: (isVertical: boolean) => ReactElement;

  /** Regardless of if the items are in a row or column, the last row */
  lastRow: (isVertical: boolean) => ReactElement;

  /** If rendering as a row, we insert this between each element */
  gapBetweenColumns: (isVertical: boolean, key: string) => ReactElement;

  /** If rendering as a column, we insert this between each element */
  gapBetweenRows: (isVertical: boolean, key: string) => ReactElement;

  /** The items to render */
  items: (isVertical: boolean) => ReactElement[];
};

export const RowOrColumn = (props: RowOrColumnProps): ReactElement => {
  const isVerticalVWC = useMappedVWC(
    props.width,
    useCallback((width) => width < props.breakpoint, [props.breakpoint])
  );

  return (
    <WithVWC
      value={isVerticalVWC}
      component={(isVertical) =>
        isVertical ? (
          <div
            className={LAYOUT.row}
            style={{
              flex: (() => {
                const flex = props.flex(isVertical);
                return `${flex.grow} ${flex.shrink} ${flex.basis}`;
              })(),
            }}
          >
            {props.firstColumn(isVertical)}
            <div className={LAYOUT.column} style={{ flexGrow: 1 }}>
              {props.firstRow(isVertical)}
              {(() => {
                const result: ReactElement[] = [];
                const items = props.items(isVertical);
                for (let i = 0; i < items.length; i++) {
                  if (i > 0) {
                    result.push(
                      props.gapBetweenRows(isVertical, `spacer-${i}`)
                    );
                  }
                  result.push(items[i]);
                }
                return result;
              })()}
              {props.lastRow(isVertical)}
            </div>
            {props.lastColumn(isVertical)}
          </div>
        ) : (
          <div
            className={LAYOUT.column}
            style={{
              flex: (() => {
                const flex = props.flex(isVertical);
                return `${flex.grow} ${flex.shrink} ${flex.basis}`;
              })(),
            }}
          >
            {props.firstRow(isVertical)}
            <div className={LAYOUT.row} style={{ flexGrow: 1 }}>
              {props.firstColumn(isVertical)}
              {(() => {
                const result: ReactElement[] = [];
                const items = props.items(isVertical);
                for (let i = 0; i < items.length; i++) {
                  if (i > 0) {
                    result.push(
                      props.gapBetweenColumns(isVertical, `spacer-${i}`)
                    );
                  }
                  result.push(items[i]);
                }
                return result;
              })()}
              {props.lastColumn(isVertical)}
            </div>
            {props.lastRow(isVertical)}
          </div>
        )
      }
    />
  );
};
