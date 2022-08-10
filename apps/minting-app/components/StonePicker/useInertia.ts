import { useCallback } from "react";
import { useSpring } from "react-spring";

function useInertia(initialProps: any) {
  const [props, set] = useSpring(() => initialProps);

  const setInertia = useCallback(
    ({ config, ...to }) => {
      Object.entries(props).forEach(([key, v]) => {
        if (key in to) {
          const { inertia, bounds, velocity, ...rest } =
            typeof config === "function" ? config(key) : config;
          if (inertia) {
            set({ [key]: to[key], config: { decay: true, velocity } });
          }
        }
      });

      const { inertia, bounds, velocity, ...rest } = config;

      if (inertia) {
        set({
          ...to,
          onChange: (values) => {
            Object.entries(values).forEach(([key, v]) => {
              const vel = props[key].velocity;
              const bound =
                v >= bounds[key][1]
                  ? bounds[key][1]
                  : v <= bounds[key][0]
                  ? bounds[key][0]
                  : undefined;
              if (bound !== undefined) {
                set({ [key]: bound, config: { decay: false, velocity: vel } });
              }
            });
          },
          config: (k) => ({ decay: true, velocity: velocity[k] }),
        });
      } else {
        set({ ...to, config: rest });
      }
    },
    [props, set]
  );

  return [props, setInertia] as const;
}
export default useInertia;
