export type Point = {
  x: number;
  y: number;
};

export function centerAndRadius(rect: DOMRect) {
  const { left, right, top } = rect;

  const radius = (right - left) / 2;
  const center = { x: left + radius, y: top + radius };

  return { center, radius };
}

export function angleToPosition(
  center: Point,
  radius: number,
  degrees: number
) {
  const radians = ((degrees - 90) * Math.PI) / 180.0;
  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians),
  };
}

export function closestPointInCircumference(
  center: Point,
  radius: number,
  point: Point
) {
  const vX = point.x - center.x;
  const vY = point.y - center.y;
  const magV = Math.sqrt(vX * vX + vY * vY);
  const aX = center.x + (vX / magV) * radius;
  const aY = center.y + (vY / magV) * radius;

  return { x: aX, y: aY };
}

export function positionToAngle(center: Point, { x, y }: Point) {
  let carry;
  let opposite;
  let adjacent;
  if (x >= center.x && y <= center.y) {
    // first quadradant
    carry = 0;
    adjacent = center.y - y;
    opposite = x - center.x;
  } else if (x >= center.x && y >= center.y) {
    // second quadradant
    carry = Math.PI / 2;
    adjacent = x - center.x;
    opposite = y - center.y;
  } else if (x <= center.x && y >= center.y) {
    // third quadradant
    carry = Math.PI;
    adjacent = y - center.y;
    opposite = center.x - x;
  } else {
    // fourth quadradant
    carry = Math.PI * 1.5;
    adjacent = center.x - x;
    opposite = center.y - y;
  }

  const radians = carry + Math.atan(opposite / adjacent);
  const degrees = (radians * 180) / Math.PI;

  return degrees;
}

export function toUnscaledPoint(
  rectangle: DOMRect,
  point: Point,
  realSize: number
) {
  const size = rectangle.right - rectangle.left;
  const xInPerc = (point.x - rectangle.left) / size;
  const yInPerc = (point.y - rectangle.top) / size;

  return { x: xInPerc * realSize, y: yInPerc * realSize };
}
