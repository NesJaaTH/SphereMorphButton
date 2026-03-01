import type { ColorScheme } from "../types/button";

export const COLOR_SCHEMES: Record<ColorScheme, { base: [number, number, number]; shift: [number, number, number] }> = {
  rainbow: {
    base: [0.5, 0.5, 0.5],
    shift: [0.0, 0.33, 0.67],
  },
  pink: {
    base: [0.8, 0.2, 0.5],
    shift: [0.0, 0.1, 0.2],
  },
  cyan: {
    base: [0.2, 0.6, 0.8],
    shift: [0.5, 0.6, 0.7],
  },
  custom: {
    base: [0.5, 0.5, 0.5],
    shift: [0.0, 0.33, 0.67],
  },
};
