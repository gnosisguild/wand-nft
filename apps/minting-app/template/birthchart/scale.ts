import { Planet, Aspect } from "../../types";
import { MAX_VALUE, CHART_RADIUS, STONE_RADIUS } from "./const";

export const scaleAspects = (aspects: Aspect[]) =>
  aspects.map((aspect) => ({
    x1: Math.round((aspect.x1 * STONE_RADIUS) / MAX_VALUE),
    y1: Math.round((aspect.y1 * STONE_RADIUS) / MAX_VALUE),
    x2: Math.round((aspect.x2 * STONE_RADIUS) / MAX_VALUE),
    y2: Math.round((aspect.y2 * STONE_RADIUS) / MAX_VALUE),
  }));

export const scalePlanets = (planets: Planet[]) =>
  planets.map((planet) => ({
    x: Math.round((planet.x * CHART_RADIUS) / MAX_VALUE),
    y: Math.round((planet.y * CHART_RADIUS) / MAX_VALUE),
    visible: planet.visible,
  }));
