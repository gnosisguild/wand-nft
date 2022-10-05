import { StaticImageData } from "next/image";
import ZodiacIcon from "../../public/images/zodiac-icon.png";
import ZodiacEcosystem from "./ZodiacEcosystem";
import Wand1 from "../../public/images/wand-1.png";
import Wand2 from "../../public/images/wand-2.png";
import Wand3 from "../../public/images/wand-3.png";

interface ImageProps {
  paths?: StaticImageData[];
  animateIn?: string;
  persist?: boolean;
  reverse?: boolean;
  svg?: JSX.Element;
  imageHeight?: string;
}

interface FrameProps {
  text?: (string | JSX.Element)[];
  images?: ImageProps;
  height?: string;
  textHeight?: number;
}

export const frames: FrameProps[] = [
  {
    text: [`Myths are resilient.`],
  },
  {
    text: [
      `Take, for instance, the stories we tell ourselves about the stars.`,
    ],
  },
  {
    text: [
      `The characters that accompany the constellations, like the Great Bear, the Bull, or the Seven Sisters, appear to pass easily from one generation to the next.`,
    ],
  },
  {
    text: [
      `These myths, however, are not merely stories, they are also design systems, supported by artefacts like glyphs, charts, and cards that carry their resemblance through time…`,
    ],
  },
  {
    images: {
      paths: [ZodiacIcon],
    },
  },
  {
    text: [
      `The Wand NFTs are a portal to the Zodiac ecosystem. We hope you hold them in common.`,
    ],
  },
  {
    images: {
      svg: <ZodiacEcosystem />,
      imageHeight: `60%`,
    },
    text: [
      `The Zodiac ecosystem has the open standard at its heart, supported by the tools and wiki.`,
    ],
    height: `70vh`,
    textHeight: 1.5,
  },
  {
    images: {
      persist: true,
      svg: <ZodiacEcosystem animateIn={"governed-by"} />,
      imageHeight: `60%`,
    },
    text: [
      `The Wand NFTs govern the Zodiac ecosystem. However, holding a wand alone does not confer governance power.`,
    ],
    height: `70vh`,
  },
  {
    images: {
      persist: true,
      svg: <ZodiacEcosystem animateIn={"governed-by"} />,
      imageHeight: `60%`,
    },
    text: [
      `With evolved wands, you can vote, curate the wiki, and administrate the tools repository.`,
    ],
    height: `70vh`,
    textHeight: 1.5,
  },
  {
    text: [
      `To evolve your Wand NFT, you can contribute to the Zodiac ecosystem over time.`,
      `This will be reflected in greater governance power attributed to your account.`,
    ],
  },
  {
    images: {
      paths: [Wand1, Wand2, Wand3],
      reverse: true,
    },
    text: [`As well as an evolved wand…`],
    height: `60vh`,
  },
  {
    images: {
      paths: [Wand3],
      persist: true,
      reverse: true,
    },
    text: [`You can choose to sell your evolved Wand NFT.`],
    height: `70vh`,
  },
  {
    text: [
      `But you won’t be able to actively participate in Zodiac ecosystem governance until you hold a Wand NFT again.`,
      `Also, your governance power won’t transfer with your  Wand NFT.`,
      `Some powers can only be earned through experience…`,
    ],
  },
  {
    text: [
      `So choose which account holds your Wand NFT wisely.`,
      <>
        For the full description of Zodiac ecosystem governance, visit{` `}
        <a href="#URL" target="_blank" rel="noredirect">
          [URL]
        </a>
        .
      </>,
    ],
  },
];
