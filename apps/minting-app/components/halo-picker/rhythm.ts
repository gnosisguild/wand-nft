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
export const WIDE_FILLERS = fillers(12);
export const NARROW_FILLERS = fillers(24);

function segments(count: number) {
  let result: string[] = [];

  const arcSize = 360 / count;

  for (let i = 0; i < count; i++) {
    const midway = i * arcSize;
    const left = midway - arcSize / 2 + ANGLE_GAP;
    const right = midway + arcSize / 2 - ANGLE_GAP;
    result = [...result, path(left, right)];
  }
  return result;
}

function fillers(count: number) {
  let result: string[] = [];

  const arcSize = 360 / count;

  for (let i = 0; i < count; i++) {
    const midway = i * arcSize + arcSize / 2;
    const left = midway - ANGLE_GAP;
    const right = midway + ANGLE_GAP;
    result = [...result, path(left, right)];
  }

  return result;
}

function path(startAngle: number, endAngle: number) {
  const upperLeft = coordinates(RADIUS_OUTER, startAngle);
  const lowerRight = coordinates(RADIUS_INNER, endAngle);

  return [
    "M",
    upperLeft.x,
    upperLeft.y,
    ...arc(RADIUS_OUTER, endAngle, true),
    "L",
    lowerRight.x,
    lowerRight.y,
    ...arc(RADIUS_INNER, startAngle, false),
    "L",
    upperLeft.x,
    upperLeft.y,
  ].join(" ");
}

function arc(radius: number, angle: number, direction: boolean) {
  const end = coordinates(radius, angle);

  const largeArcFlag = "0";
  const sweepArcFlag = direction ? "1" : "0";

  return ["A", radius, radius, 0, largeArcFlag, sweepArcFlag, end.x, end.y];
}

function coordinates(radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180.0;

  return {
    x: CENTER_X + radius * Math.cos(radians),
    y: CENTER_Y + radius * Math.sin(radians),
  };
}
