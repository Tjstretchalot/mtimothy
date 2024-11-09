/**
 * The default equality function for comparing values in e.g. setVWC. Returns
 * true if the two values are immutable and the same, false if one is either mutable
 * or different from the other.
 */
export const defaultEqualityFn = <T>(a: T, b: T) => {
  if (
    a === null ||
    a === undefined ||
    typeof a === 'number' ||
    typeof a === 'string' ||
    typeof a === 'boolean'
  ) {
    return a === b;
  }

  return false;
};
