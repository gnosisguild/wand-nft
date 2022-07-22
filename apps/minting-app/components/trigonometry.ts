export type Point = {
  x: number;
  y: number;
};

export function findClosestInCircumference(
  center: Point,
  radius: number,
  point: Point
) {
  const vX = point.x - center.x;
  const vY = point.y - center.y;
  const magV = Math.sqrt(vX * vX + vY * vY);

  return {
    x: center.x + (vX / magV) * radius,
    y: center.y + (vY / magV) * radius,
  };
}

export function toAngle(center: Point, { x, y }: Point) {
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

export function toPosition(center: Point, radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180.0;
  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians),
  };
}

export function dimensions(rect: DOMRect) {
  const { left, right, top, bottom } = rect;

  const width = right - left;
  const height = bottom - top;
  const center = { x: left + width / 2, y: top + height / 2 };

  return { center, width, height };
}
