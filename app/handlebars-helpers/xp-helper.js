module.exports = function (cap, xp, percentSizeOfMark, block) {
  let accum = "";
  const fillPercent = (xp / cap) * 100;
  const segmentsNeeded = Math.floor(fillPercent / percentSizeOfMark);
  // console.log("segments", segmentsNeeded, fillPercent);
  for (let index = 1; index <= segmentsNeeded; index++) {
    // calc rotation required for element
    const fillDeg = Math.round((360 * fillPercent) / 100);
    const segFillDeg = Math.round(fillDeg / segmentsNeeded);
    const rot = segFillDeg * index;
    // console.log(index, fillDeg, segFillDeg, rot);
    accum += block.fn(rot);
  }
  return accum;
};
