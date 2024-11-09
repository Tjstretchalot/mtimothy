import styles from './resets.module.css';

/**
 * Resets for specific types of elements to make them behave like
 * a typical column container element (unless otherwise specified).
 *
 * We load `resets.module.css` such that when breaking ties it always
 * loses to other styles, i.e., its loaded first.
 */
export const RESETS = {
  button: styles.button,
  anchor: styles.anchor,
};
