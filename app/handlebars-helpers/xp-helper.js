module.exports = function (cap, xp) {
  // ~37% is 100% full on the current xp bar
  return (xp / cap) * 37.2;
};
