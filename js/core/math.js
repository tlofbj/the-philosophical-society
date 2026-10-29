export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/** Frame-rate independent exponential smoothing toward a target. */
export const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));

/** Rounds to 3 decimals so transform strings stay short. */
export const r3 = (v) => Math.round(v * 1000) / 1000;
