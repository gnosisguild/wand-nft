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
  spanInDegrees: number;
  viewBoxSize: number;
};

export function describeSegments(count: number, config: SegmentConfig) {
  let result: string[] = [];

  const arcSize = 360 / count;
  const { percSkew, gapInDegrees } = config;
  const [outerRadius, innerRadius] = radius(config);

  for (let i = 0; i < count; i++) {
    const left = i * arcSize - percSkew * arcSize + gapInDegrees;
    const right = (i + 1) * arcSize - percSkew * arcSize - gapInDegrees;
    result = [...result, path(config, left, right, outerRadius, innerRadius)];
  }
  return result;
}

export function describeFillers(count: number, config: FillerConfig) {
  let result: string[] = [];

  const arcSize = 360 / count;
  const { spanInDegrees } = config;
  const [outerRadius, innerRadius] = radius(config);

  for (let i = 0; i < count; i++) {
    const midway = i * arcSize + arcSize / 2 - 180;
    const left = midway - spanInDegrees / 2;
    const right = midway + spanInDegrees / 2;
    result = [...result, path(config, left, right, outerRadius, innerRadius)];
  }

  return result;
}

function path(
  config: SegmentConfig | FillerConfig,
  startAngle: number,
  endAngle: number,
  radiusOuter: number,
  radiusInner: number
): string {
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

function arc(
  config: SegmentConfig | FillerConfig,
  radius: number,
  angle: number,
  direction: boolean
) {
  const end = coordinates(config, radius, angle);

  const largeArcFlag = "0";
  const sweepArcFlag = direction ? "1" : "0";

  return ["A", radius, radius, 0, largeArcFlag, sweepArcFlag, end.x, end.y];
}

function radius({
  percBorder,
  percThickness,
  viewBoxSize,
}: SegmentConfig | FillerConfig) {
  const outer = (viewBoxSize - viewBoxSize * percBorder * 2) / 2;
  const inner =
    (viewBoxSize -
      viewBoxSize * percBorder * 2 -
      viewBoxSize * percThickness * 2) /
    2;

  return [outer, inner];
}

function coordinates(
  { viewBoxSize }: SegmentConfig | FillerConfig,
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
