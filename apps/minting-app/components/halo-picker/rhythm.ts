export const VIEWBOX_WIDTH = 1000;
export const VIEWBOX_HEIGHT = 1000;

const PERC_BORDER = 0.91;
const PERC_THICKNESS = 0.05;
const FILLER_PERC_BORDER = 0.9;
const FILLER_PERC_THICKNESS = 0.07;

const ANGLE_GAP = 2;

const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = VIEWBOX_HEIGHT / 2;

const RADIUS_OUTER = (VIEWBOX_WIDTH - VIEWBOX_WIDTH * PERC_BORDER * 2) / 2;
const RADIUS_INNER =
  (VIEWBOX_WIDTH -
    VIEWBOX_WIDTH * PERC_BORDER * 2 -
    VIEWBOX_WIDTH * PERC_THICKNESS * 2) /
  2;

const FILLER_RADIUS_OUTER =
  (VIEWBOX_WIDTH - VIEWBOX_WIDTH * FILLER_PERC_BORDER * 2) / 2;
const FILLER_RADIUS_INNER =
  (VIEWBOX_WIDTH -
    VIEWBOX_WIDTH * FILLER_PERC_BORDER * 2 -
    VIEWBOX_WIDTH * FILLER_PERC_THICKNESS * 2) /
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
    const left = midway - ANGLE_GAP + 1.3;
    const right = midway + ANGLE_GAP - 1.3;
    result = [
      ...result,
      path(left, right, FILLER_RADIUS_INNER, FILLER_RADIUS_OUTER),
    ];
  }

  return result;
}

function path(
  startAngle: number,
  endAngle: number,
  radiusInner: number = RADIUS_INNER,
  radiusOuter: number = RADIUS_OUTER
): string {
  const upperLeft = coordinates(radiusOuter, startAngle);
  const lowerRight = coordinates(radiusInner, endAngle);

  return [
    "M",
    upperLeft.x,
    upperLeft.y,
    ...arc(radiusOuter, endAngle, true),
    "L",
    lowerRight.x,
    lowerRight.y,
    ...arc(radiusInner, startAngle, false),
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
