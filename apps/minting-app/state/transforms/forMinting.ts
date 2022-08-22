import assert from "assert";
import { BigNumber } from "ethers";
import memo from "memoize-one";
import { calculateAspects, calculatePlanets } from "../../birthchart";
import { AppState, Aspect, Halo, Planet } from "../../types";
import { transformColor } from "./transformColor";

export function packForMinting(state: AppState, date: Date = new Date()) {
  state = transformColor(state);

  const [packedPlanets, packedAspects, packedVisibility] = packAstrology(
    state.latitude,
    state.longitude,
    date
  );

  return [
    state.stone,
    packHalo(state),
    state.handle,
    packBackground(state),
    packedPlanets,
    packedAspects,
    packedVisibility,
  ];
}

function packHalo(state: AppState) {
  const halo = cleanRhythm(state.halo);

  let rhythm = 0;
  for (let i = 0; i < 13; i++) {
    rhythm |= (halo.rhythm[i] ? 1 : 0) << i;
  }

  return (rhythm << 3) | halo.shape;
}

function packBackground(state: AppState) {
  let packedBackground = 0;
  // 1 bit
  packedBackground |= state.background.radial ? 1 : 0;
  // 1 bit
  packedBackground |= (state.background.dark ? 1 : 0) << 1;
  // 8 bits
  packedBackground |= state.background.color.saturation << 2;
  // 8 bits
  packedBackground |= state.background.color.lightness << 10;
  // 16 bits
  packedBackground |= state.background.color.hue << 18;

  return packedBackground;
}

const packAstrology = memo(
  (latitude: number, longitude: number, date: Date) => {
    const planets = calculatePlanets(latitude, longitude, 0, date);
    const aspects = calculateAspects(latitude, longitude, 0, date);

    const [packedPlanets, packedVisibility] = packPlanets(planets);
    const packedAspects = packAspects(aspects);

    return [packedPlanets, packedAspects, packedVisibility];
  }
);

function packPlanets(planets: Planet[]) {
  assert(planets.length === 8);
  let packedPlanets = "";
  let packedVisibility = 0;

  for (let i = 0; i < 8; i++) {
    const x = planets[i].x || 0;
    const y = planets[i].y || 0;

    const ux = x < 0 ? Math.pow(2, 8) + x : x;
    const uy = y < 0 ? Math.pow(2, 8) + y : y;

    const chunkX = toBinary(ux, 8);
    const chunkY = toBinary(uy, 8);
    const chunk = toHex(`${chunkY}${chunkX}`, 4);

    packedPlanets = `${chunk}${packedPlanets}`;
    packedVisibility |= (planets[i].visible ? 1 : 0) << i;
  }

  return [BigNumber.from(`0x${packedPlanets}`), packedVisibility];
}

function packAspects(aspects: Aspect[]) {
  assert(aspects.length === 8);

  let packedAspects = "";

  for (let i = 0; i < 8; i++) {
    const aspect = aspects[i];
    const a = aspect.x1 || 0;
    const b = aspect.y1 || 0;
    const c = aspect.x2 || 0;
    const d = aspect.y2 || 0;

    const ua = a < 0 ? Math.pow(2, 8) + a : a;
    const ub = b < 0 ? Math.pow(2, 8) + b : b;
    const uc = c < 0 ? Math.pow(2, 8) + c : c;
    const ud = d < 0 ? Math.pow(2, 8) + d : d;

    const chunka = toBinary(ua, 8);
    const chunkb = toBinary(ub, 8);
    const chunkc = toBinary(uc, 8);
    const chunkd = toBinary(ud, 8);
    const chunk = toHex(`${chunkd}${chunkc}${chunkb}${chunka}`, 8);

    packedAspects = `${chunk}${packedAspects}`;
  }

  return BigNumber.from(`0x${packedAspects}`);
}

function cleanRhythm(halo: Halo): Halo {
  if ([1, 5].includes(halo.shape)) {
    // isNarrow
    return halo;
  }

  return {
    ...halo,
    rhythm: halo.rhythm.map((r, index) => r && index % 2 === 0),
  };
}

function toBinary(n: number, length: number) {
  return n.toString(2).padStart(length, "0");
}

function toHex(binary: string, length: number) {
  return parseInt(binary, 2).toString(16).padStart(length, "0");
}
