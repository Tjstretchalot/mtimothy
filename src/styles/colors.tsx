import styles from './colors.module.css';

/** Color values by name; these are also available as css values via index.css */
export const COLOR_VALUES = {
  gray: {
    light: '#F4F3EE',
    smoke: '#BCB8B1',
    gray: '#8A817C',
    dark: '#0B0A09',
  },
  primary: {
    light: '#AAB8EE',
    dark: '#1E3799',
  },
  error: {
    dark: '#CC0000',
    light: '#FFC7C7',
  },
};

/** Color one common attribute by name, for convenience */
export const COLOR_CLASSES = {
  color: {
    gray: {
      light: styles.color__gray__light,
      smoke: styles.color__gray__smoke,
      gray: styles.color__gray__gray,
      dark: styles.color__gray__dark,
    },
    primary: {
      light: styles.color__primary__light,
      dark: styles.color__primary__dark,
    },
    error: {
      dark: styles.color__error__dark,
      light: styles.color__error__light,
    },
  },
  background: {
    gray: {
      light: styles.background__gray__light,
      smoke: styles.background__gray__smoke,
      gray: styles.background__gray__gray,
      dark: styles.background__gray__dark,
    },
    primary: {
      light: styles.background__primary__light,
      dark: styles.background__primary__dark,
    },
    error: {
      dark: styles.background__error__dark,
      light: styles.background__error__light,
    },
  },
  border: {
    gray: {
      light: styles.border__gray__light,
      smoke: styles.border__gray__smoke,
      gray: styles.border__gray__gray,
      dark: styles.border__gray__dark,
    },
    primary: {
      light: styles.border__primary__light,
      dark: styles.border__primary__dark,
    },
    error: {
      dark: styles.border__error__dark,
      light: styles.border__error__light,
    },
  },
};
