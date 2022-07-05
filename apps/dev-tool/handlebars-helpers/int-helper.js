module.exports = function (arg, { hash }) {
  const { decimals = 0 } = hash;
  return arg / Math.pow(10, decimals);
};
