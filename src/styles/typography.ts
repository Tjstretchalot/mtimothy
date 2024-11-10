import styles from './typography.module.css';

/** The fonts we use by category; also available in css variables via index.css (--font-headers, --font-body) */
export const FONTS = {
  headers:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

/**
 * The named typography "bundles" we use. These all will set the following values:
 * - font-family
 * - font-size
 * - font-weight
 * - line-height
 * - letter-spacing
 * - font-variant
 */
export const TYPOGRAPHY = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  title: styles.title,
  body: styles.body,
  fine: styles.fine,
};

/** Overrides typography-related properties for a specific effect */
export const TYPOGRAPHY_MODIFIERS = {
  /** line-height: 1 */
  tight: styles.tight,

  /** prevents line breaks */
  noWrap: styles.noWrap,
};
