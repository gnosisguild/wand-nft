type SegmentConfig = {
  percBorder: number;
  percThickness: number;
  percSkew: number;
  gapInDegrees: number;
  viewBoxSize: number;
};

type FillerConfig = {
  percBorder: number;
  percThickness: number;
  percSkew: number;
  spanInDegrees: number;
  viewBoxSize: number;
};

type SizingConfig = {
  percBorder: number;
  percThickness: number;
  viewBoxSize: number;
};

export function describeSegments(count: number, config: SegmentConfig) {
  let result: string[] = [];

  const arcSize = 360 / count;
  const { percSkew, gapInDegrees } = config;
  const skew = (360 / count) * percSkew;

  for (let i = 0; i < count; i++) {
    const left = i * arcSize - skew + gapInDegrees;
    const right = (i + 1) * arcSize - skew - gapInDegrees;
    result = [...result, path(config, left, right)];
  }
  return result;
}

export function describeFillers(count: number, config: FillerConfig) {
  let result: string[] = [];

  const arcSize = 360 / count;
  const { percSkew, spanInDegrees } = config;
  const skew = (360 / count) * percSkew;

  for (let i = 0; i < count; i++) {
    const midway = i * arcSize + skew;
    const left = midway - spanInDegrees / 2;
    const right = midway + spanInDegrees / 2;
    result = [...result, path(config, left, right)];
  }

  return result;
}

export function path(
  config: SizingConfig,
  startAngle: number,
  endAngle: number
): string {
  const [radiusOuter, radiusInner] = radius(config);

  const upperLeft = coordinates(config, radiusOuter, startAngle);
  const lowerRight = coordinates(config, radiusInner, endAngle);

  return [
    "M",
    upperLeft.x,
    upperLeft.y,
    ...arc(config, radiusOuter, endAngle, true),
    "L",
    lowerRight.x,
    lowerRight.y,
    ...arc(config, radiusInner, startAngle, false),
    "L",
    upperLeft.x,
    upperLeft.y,
  ].join(" ");
}

export function findSegmentCenters(count: number, config: SegmentConfig) {
  const step = 360 / count;

  const { percBorder, percThickness, percSkew, viewBoxSize } = config;
  const radius =
    viewBoxSize / 2 -
    percBorder * viewBoxSize -
    (percThickness * viewBoxSize) / 2;
  const skew = (360 / count) * percSkew;

  return new Array(count).fill(null).map((_, index) => {
    const left = index * step - skew;
    const midway = left + step / 2;
    return coordinates(config, radius, midway);
  });
}

function arc(
  config: SizingConfig,
  radius: number,
  angle: number,
  direction: boolean
) {
  const end = coordinates(config, radius, angle);

  const largeArcFlag = "0";
  const sweepArcFlag = direction ? "1" : "0";

  return ["A", radius, radius, 0, largeArcFlag, sweepArcFlag, end.x, end.y];
}

function radius({ percBorder, percThickness, viewBoxSize }: SizingConfig) {
  const outer = (viewBoxSize - viewBoxSize * percBorder * 2) / 2;
  const inner =
    (viewBoxSize -
      viewBoxSize * percBorder * 2 -
      viewBoxSize * percThickness * 2) /
    2;

  return [outer, inner];
}

function coordinates(
  { viewBoxSize }: SizingConfig,
  radius: number,
  degrees: number
) {
  const radians = ((degrees - 90) * Math.PI) / 180.0;

  const center = { x: viewBoxSize / 2, y: viewBoxSize / 2 };

  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians),
  };
}
