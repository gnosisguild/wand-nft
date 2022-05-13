import { Equator, Horizon, Observer } from "astronomy-engine";
import { ALL_BODIES, CHART_RADIUS } from "./const";

// http://ip-api.com/json
const latitude = 52.5422;
const longitude = 13.3495;
const toRad = (deg: number) => deg * (Math.PI / 180);

interface Point {
  x: number;
  y: number;
}

export const calculateBodyPositions = (
  latitude: number,
  longitude: number,
  altitude = 0,
  date = new Date()
) => {
  const observer = new Observer(latitude, longitude, altitude);

  const positions: { [key: string]: Point } = {};

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
    };
  });

  return positions;
};

export const calculateVisiblePlanetPositions = (
  latitude: number,
  longitude: number,
  altitude = 0,
  date = new Date()
) => {
  const positions = calculateBodyPositions(latitude, longitude, altitude, date);
  const planetPositions = Object.values(positions).slice(2); // skip sun and moon
  return planetPositions.map(({ x, y }) => {
    // coordinates further away than the scaled radius mean that the planet is not currently visible on the local celestial sphere
    // we zero them, which means they won't be rendered
    if (Math.sqrt(x * x + y * y) > CHART_RADIUS) return { x: 0, y: 0 };
    return { x, y };
  });
};
