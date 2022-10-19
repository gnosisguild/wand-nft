import { Stone } from "../../types";

const StoneFilter: React.FC<{
  seed: number;
  stone: Stone;
  filterUniqueId?: string;
}> = ({ seed, stone, filterUniqueId = "picker_s" }) => {
  return (
    <filter id={filterUniqueId}>
      <feTurbulence
        type={stone.fractalNoise ? "fractalNoise" : "turbulence"}
        baseFrequency={`${stone.turbFreqX / 1000} ${stone.turbFreqY / 1000}`}
        numOctaves={stone.turbOct}
        seed={seed}
      />
      <feComponentTransfer>
        <feFuncR
          type="gamma"
          amplitude={stone.redAmp / 100}
          exponent={stone.redExp / 100}
          offset={stone.redOff / 100}
        />
        <feFuncG
          type="gamma"
          amplitude={stone.greenAmp / 100}
          exponent={stone.greenExp / 100}
          offset={stone.greenOff / 100}
        />
        <feFuncB
          type="gamma"
          amplitude={stone.blueAmp / 100}
          exponent={stone.blueExp / 100}
          offset={stone.blueOff / 100}
        />
        <feFuncA type="discrete" tableValues="1" />
      </feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic" result="picker_tex" />

      <feMerge>
        <feMergeNode in="picker_tex" />
      </feMerge>
    </filter>
  );
};

export default StoneFilter;
