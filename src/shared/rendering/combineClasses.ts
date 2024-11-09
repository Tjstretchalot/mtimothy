/** Convenience function to combine all the not-undefined class names with a space */
export const combineClasses = (...classes: (string | undefined)[]) => {
  return classes.filter((c) => c !== undefined).join(' ');
};
