const { BigNumber, FixedNumber } = require("ethers");

const toFixed = (value, decimals) => {
  if (decimals === 0) return value.toString();

  const fixedNumber = FixedNumber.fromValue(value, decimals).toString();
  const [integral, fractional] = fixedNumber.split(".");
  return `${integral}.${fractional.padEnd(decimals, "0")}`;
};

module.exports = function (arg, { hash }) {
  const { decimals = 0 } = hash;
  return toFixed(BigNumber.from(arg), decimals);
};
