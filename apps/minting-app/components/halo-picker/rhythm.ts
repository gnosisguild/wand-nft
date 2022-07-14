export const VIEWBOX_WIDTH = 1000;
export const VIEWBOX_HEIGHT = 1000;

const PERC_BORDER = 0.91;
const PERC_THICKNESS = 0.05;
const ANGLE_GAP = 2;

const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = VIEWBOX_HEIGHT / 2;

const RADIUS_OUTER = (VIEWBOX_WIDTH - VIEWBOX_WIDTH * PERC_BORDER * 2) / 2;
const RADIUS_INNER =
  (VIEWBOX_WIDTH -
    VIEWBOX_WIDTH * PERC_BORDER * 2 -
    VIEWBOX_WIDTH * PERC_THICKNESS * 2) /
  2;

export const WIDE_SEGMENTS = segments(12);
export const NARROW_SEGMENTS = segments(24);

function segments(count: number) {
  const arcSize = 360 / count;

  let result = [segment(360 - arcSize / 2, arcSize / 2)];

  for (let left = arcSize / 2; left + arcSize < 360; left += arcSize) {
    const right = left + arcSize;
    result = [...result, segment(left, right)];
  }
  return result;
}

function segment(startAngle: number, endAngle: number) {
  const upperLeft = polarToCartesian(RADIUS_OUTER, startAngle + ANGLE_GAP);
  const lowerRight = polarToCartesian(RADIUS_INNER, endAngle - ANGLE_GAP);

  return [
    "M",
    upperLeft.x,
    upperLeft.y,
    ...arc(RADIUS_OUTER, endAngle - ANGLE_GAP, true),
    "L",
    lowerRight.x,
    lowerRight.y,
    ...arc(RADIUS_INNER, startAngle + ANGLE_GAP, false),
    "L",
    upperLeft.x,
    upperLeft.y,
  ].join(" ");
}

function arc(radius: number, angle: number, direction: boolean) {
  const end = polarToCartesian(radius, angle);

  const largeArcFlag = "0";
  const sweepArcFlag = direction ? "1" : "0";

  return ["A", radius, radius, 0, largeArcFlag, sweepArcFlag, end.x, end.y];
}

function polarToCartesian(radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: CENTER_X + radius * Math.cos(angleInRadians),
    y: CENTER_Y + radius * Math.sin(angleInRadians),
  };
}
