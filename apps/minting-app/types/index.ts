export interface Planet {
  x: number;
  y: number;
  visible: boolean;
}
interface Aspect {
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

export interface EmbossLayer {
  fractalNoise: boolean;
  turbFreqX: number;
  turbFreqY: number;
  turbOct: number;
  turbBlur: number;
  dispScale: number;
  surfaceScale: number;
  specConstant: number;
  specExponent: number;
  lightColor: string;
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
  seed: number;
  seasonsAmplitude?: number;
  secondInYear?: number;
  secondInDay?: number;
}

export interface Background {
  hue: number;
  linear?: boolean;
  radial?: boolean;
  light?: boolean;
  dark?: boolean;
  color: {
    hue: number;
    saturation: number;
    lightness: number;
  };
}

export interface Halo {
  halo0?: boolean;
  halo1?: boolean;
  halo2?: boolean;
  halo3?: boolean;
  halo4?: boolean;
  halo5?: boolean;
  rhythm: Boolean[];
  hue: number;
}

export interface Settings {
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
  halo: Halo;
  handle: {
    handle0?: boolean;
    handle1?: boolean;
    handle2?: boolean;
    handle3?: boolean;
  };
  sparkle: {
    sparkles: Sparkle[];
  };
  filter: {
    layers: EmbossLayer[];
  };
  stone: Stone;
  stars: {
    starsSeed: number;
  };
  xp: {
    cap: number;
    amount: number;
    crown: boolean;
  };
}
