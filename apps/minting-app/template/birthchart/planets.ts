import { Equator, Horizon, Observer } from "astronomy-engine";
import { Planet } from "../../types";
import { ALL_BODIES, CHART_RADIUS } from "./const";

const toRad = (deg: number) => deg * (Math.PI / 180);

export const calculateBodyPositions = (
  latitude: number,
  longitude: number,
  altitude = 0,
  date = new Date()
) => {
  const observer = new Observer(latitude, longitude, altitude);

  const positions: { [key: string]: Planet } = {};

  ALL_BODIES.forEach((body) => {
    const equator = Equator(body, date, observer, true, true);
    const horizon = Horizon(date, observer, equator.ra, equator.dec, "normal");

    // stereographic projection, see: https://astronomy.stackexchange.com/a/35888
    const x =
      Math.sin(toRad(horizon.azimuth)) * Math.cos(toRad(horizon.altitude));
    const y =
      Math.cos(toRad(horizon.azimuth)) * Math.cos(toRad(horizon.altitude));
    const z = Math.sin(toRad(horizon.altitude));
    const flatX = x / (z + 1);
    const flatY = y / (z + 1);

    // scale by circle radius and make sure north is up on screen coordinate system
    // east we want to keep to the right, since the viewer is looking onto the sphere from above (out in space)
    positions[body] = {
      x: Math.round(CHART_RADIUS * flatX),
      y: Math.round(-CHART_RADIUS * flatY),

      // coordinates further away than 1 mean that the planet is not currently visible on the local celestial sphere
      visible: Math.sqrt(flatX * flatX + flatY * flatY) <= 1,
    };
  });

  return positions;
};

export const calculatePlanetPositions = (
  latitude: number,
  longitude: number,
  altitude = 0,
  date = new Date()
) => {
  const positions = calculateBodyPositions(latitude, longitude, altitude, date);
  return Object.values(positions)
    .slice(2) // skip sun and moon
    .map(({ x, y, visible }) => ({
      // zero coordinates if invisible
      visible,
      x: visible ? x : 0,
      y: visible ? y : 0,
    }));
};
