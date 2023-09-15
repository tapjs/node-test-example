export const stringOrNull = (x) => (x ? String(x) : null);
export const add = (a, b) =>
  typeof a === "number" && typeof b === "number"
    ? a + b
    : typeof a === "string" && typeof b === "string"
    ? a + b
    : null;

// This is a function that throws, to show how both
// handle errors.
export const thrower = (n) => new Date(n).toISOString()

// one that fails, to show how failures are handled
export const failer = (n) => String(n + 1)
