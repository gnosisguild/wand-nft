import { constants } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import React from "react";
import { useAccount } from "wagmi";
import { useAppContext } from "../state";
import {
  calculateAspects,
  calculatePlanets,
  filterLayers,
  generateHalo,
  generateHandle,
  interpolateStone,
  scaleAspects,
  scalePlanets,
  xp,
} from "../template";
import { AppState, TemplateInput } from "../types";
import classes from "./SvgTemplate.module.css";
const template = require("../../../svg/template.svg.hbs");

interface Props {
  input: TemplateInput;
}
const SvgTemplate: React.FC<Props> = (props) => {
  const { state } = useAppContext();
  const { address = constants.AddressZero } = useAccount();
  const input = deriveTemplateInput(state, address);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: template(input, {
          allowProtoMethodsByDefault: true,
          allowProtoPropertiesByDefault: true,
        }),
      }}
      className={classes.container}
    />
  );
};

export default SvgTemplate;

const deriveTemplateInput = (
  state: AppState,
  address: string
): TemplateInput => ({
  planets: scalePlanets(
    calculatePlanets(state.latitude, state.longitude, 0, new Date())
  ),
  aspects: scaleAspects(
    calculateAspects(state.latitude, state.longitude, 0, new Date())
  ),
  halo: generateHalo(
    state.halo.shape,
    state.halo.rhythm,
    state.background.color.hue
  ),
  frame: {
    level1: true,
    title: "",
  },
  background: state.background,
  filterLayers,
  sparkles: [],
  seed: parseInt(keccak256(address).slice(-4), 16),
  stone: interpolateStone(state.stone),
  xp,
  handle: generateHandle(state.handle),
});
