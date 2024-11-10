import styles from './layout.module.css';

/** CSS classes that describe how an elements children behave */
export const LAYOUT = {
  /** A flex column with justify-content start and align-items stretch */
  column: styles.column,
  /** A flex row with justify-content start and align-items stretch (nowrap) */
  row: styles.row,
  /** A flex row with justify-content start, align-items stretch, and flex-wrap 1 */
  rowWrap: styles.row_wrap,
  /** Classes for stacking components on top of each other such that they take the same space */
  stack: {
    /** all children must have the child attribute, must have fixed width and height */
    container: styles.stack__container,
    /** parent should be a stack container */
    child: styles.stack__child,
  },
};
