export interface Planet {
  x: number;
  y: number;
  visible: boolean;
}
export interface Aspect {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Sparkle {
  scale: number;
  tx: number;
  ty: number;
}

interface Color {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface FilterLayer {
  fractalNoise: boolean;
  turbFreqX: number;
  turbFreqY: number;
  turbOct: number;
  turbBlur: number;
  dispScale: number;
  surfaceScale: number;
  specConstant: number;
  specExponent: number;
  lightColor: Color;
  pointX: number;
  pointY: number;
  pointZ: number;
  opacity: number;
  blurX: number;
  blurY: number;
}

export interface Stone {
  fractalNoise: boolean;
  turbFreqX: number;
  turbFreqY: number;
  turbOct: number;
  redAmp: number;
  redExp: number;
  redOff: number;
  greenAmp: number;
  greenExp: number;
  greenOff: number;
  blueAmp: number;
  blueExp: number;
  blueOff: number;
  rotation: number;
  seasonsAmplitude?: number;
  secondInYear?: number;
  secondInDay?: number;
}

export interface Background {
  radial?: boolean;
  dark?: boolean;
  color: Color;
}

export interface Halo {
  shape: 0 | 1 | 2 | 3 | 4 | 5;
  rhythm: boolean[];
}

export interface HaloInput {
  halo0?: boolean;
  halo1?: boolean;
  halo2?: boolean;
  halo3?: boolean;
  halo4?: boolean;
  halo5?: boolean;
  rhythm: boolean[];
  hue: number;
}

export interface AppState {
  latitude: number;
  longitude: number;
  background: Background;
  handle: 0 | 1 | 2 | 3;
  stone: number;
  tokenId: number;
  halo: Halo;
}

export interface TemplateInput {
  frame: {
    title: string;
    level1?: boolean;
    level2?: boolean;
    level3?: boolean;
    level4?: boolean;
    level5?: boolean;
  };
  planets: Planet[];
  aspects: Aspect[];
  background: Background;
  halo: HaloInput;
  handle: {
    handle0?: boolean;
    handle1?: boolean;
    handle2?: boolean;
    handle3?: boolean;
  };
  sparkles: Sparkle[];
  filterLayers: FilterLayer[];
  stone: Stone;
  seed: number;
  xp: {
    cap: number;
    amount: number;
    crown: boolean;
  };
}
