export const generateHandle = (handle: 0 | 1 | 2 | 3) => ({
  [`handle${handle}`]: true,
});
