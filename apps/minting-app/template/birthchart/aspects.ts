import { PairLongitude } from "astronomy-engine";
import { ALL_BODIES, STONE_RADIUS } from "./const";
import { calculateBodyPositions } from "./planets";

const fuzziness = 4;

const orbs = {
  conjunction: 0,
  opposition: 180,
  square: 90,
  trine: 120,
  sextile: 60,
};

export const calculateAspects = (
  latitude: number,
  longitude: number,
  altitude = 0,
  date = new Date()
) => {
  const aspectLines = [];

  const bodyPositions = calculateBodyPositions(
    latitude,
    longitude,
    altitude,
    date
  );

  for (let i = 0; i < ALL_BODIES.length - 1; i++) {
    for (let j = i + 1; j < ALL_BODIES.length; j++) {
      let angle = PairLongitude(ALL_BODIES[i], ALL_BODIES[j], date); // angle between 0 and 360 deg
      if (angle > 180) angle = angle - 360; // angle between -180 and 180 deg

      const orb = (Object.keys(orbs) as (keyof typeof orbs)[]).find(
        (orb) => Math.abs(orbs[orb] - Math.abs(angle)) < fuzziness
      );

      if (orb) {
        if (orb === "conjunction") {
          // we draw the conjunction like an opposition
          angle = 180 + angle;
        }

        // angle from horizon to the first planet's position (= start of the aspect line)
        const { x, y } = bodyPositions[ALL_BODIES[i]];
        const startAngle = Math.atan(-y / x);
        // angle from horizon to end point of the aspect line on the circle
        const endAngle = startAngle + (angle / 180) * Math.PI;

        // calculate line start and end points
        aspectLines.push({
          x1: Math.round(STONE_RADIUS * Math.cos(startAngle)),
          y1: Math.round(STONE_RADIUS * Math.sin(startAngle)),
          x2: Math.round(STONE_RADIUS * Math.cos(endAngle)),
          y2: Math.round(STONE_RADIUS * Math.sin(endAngle)),
        });
      }
    }
  }

  const fixedLengthResult = aspectLines.slice(0, 8);
  for (let i = fixedLengthResult.length; i < 8; i++) {
    fixedLengthResult.push(emptyAspectLine);
  }

  return fixedLengthResult;
};

const emptyAspectLine = { x1: 0, y1: 0, x2: 0, y2: 0 };
