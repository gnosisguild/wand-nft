export const generateHandle = (handle: 0 | 1 | 2 | 3 | 4 | 5) => ({
  [`handle${handle}`]: true,
});
