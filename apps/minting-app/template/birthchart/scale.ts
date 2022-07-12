import { Planet, Aspect } from "../../types";
import { CHART_RADIUS, STONE_RADIUS } from "./const";

export const scaleAspects = (aspects: Aspect[]) =>
  aspects.map((aspect) => ({
    x1: (aspect.x1 * 127) / STONE_RADIUS,
    y1: (aspect.y1 * 127) / STONE_RADIUS,
    x2: (aspect.x2 * 127) / STONE_RADIUS,
    y2: (aspect.y2 * 127) / STONE_RADIUS,
  }));

export const scalePlanets = (planets: Planet[]) =>
  planets.map((planet) => ({
    x: (planet.x * 127) / CHART_RADIUS,
    y: (planet.y * 127) / CHART_RADIUS,
    visible: planet.visible,
  }));
