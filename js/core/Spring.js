const STEP = 1 / 120;

/** A damped harmonic spring. Everything that moves on the site rides one of these. */
export class Spring {
  constructor(value = 0, { stiffness = 170, damping = 22, mass = 1 } = {}) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
  }

  /** Jump to a value with no motion. */
  set(value) {
    this.value = this.target = value;
    this.velocity = 0;
  }

  configure({ stiffness = this.stiffness, damping = this.damping } = {}) {
    this.stiffness = stiffness;
    this.damping = damping;
  }

  update(dt) {
    // Fixed sub-steps keep stiff springs stable on slow frames.
    const steps = Math.max(1, Math.ceil(dt / STEP));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const force = -this.stiffness * (this.value - this.target) - this.damping * this.velocity;
      this.velocity += (force / this.mass) * h;
      this.value += this.velocity * h;
    }
    return this.value;
  }

  isSettled(epsilon = 0.001) {
    return Math.abs(this.value - this.target) < epsilon && Math.abs(this.velocity) < epsilon * 10;
  }
}
