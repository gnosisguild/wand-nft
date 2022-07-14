import { VIEWBOX_WIDTH } from "./rhythm";

const radius = 70;
const radiusInner = radius - 10;
const x11 = VIEWBOX_WIDTH / 2 - radius;
const y11 = VIEWBOX_WIDTH / 2 - radius * 2;
const x12 = VIEWBOX_WIDTH / 2 + radius;
const y12 = VIEWBOX_WIDTH / 2 - radius * 2;

const x21 = VIEWBOX_WIDTH / 2 - radius * 2;
const y21 = VIEWBOX_WIDTH / 2;
const x22 = VIEWBOX_WIDTH / 2 + radius * 2;
const y22 = VIEWBOX_WIDTH / 2;

const x31 = VIEWBOX_WIDTH / 2 - radius;
const y31 = VIEWBOX_WIDTH / 2 + radius * 2;
const x32 = VIEWBOX_WIDTH / 2 + radius;
const y32 = VIEWBOX_WIDTH / 2 + radius * 2;

export default [
  { x: x11, y: y11, r: radiusInner, isWide: true },
  { x: x12, y: y12, r: radiusInner, isWide: true },
  { x: x21, y: y21, r: radiusInner, isWide: true },
  { x: x22, y: y22, r: radiusInner, isWide: true },
  { x: x31, y: y31, r: radiusInner, isWide: true },
  { x: x32, y: y32, r: radiusInner, isWide: true },
];
