export const TRANSITION_DURATIONS = {
  idleToHover: 0.3,
  hoverToIdle: 0.5,
  hoverToActive: 0.1,
  activeToIdle: 0.4,
  dissolveEffect: 0.8,
  shatterEffect: 1.2,
} as const;

export const EASING = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  linear: (t: number) => t,
} as const;
