import { damp } from './math.js';

/** Global pointer state: raw position, a smoothed position, and velocity. */
export class Pointer {
  constructor() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.sx = this.x;
    this.sy = this.y;
    this.vx = 0;
    this.vy = 0;
    this.active = false;
    this.fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    this.#px = this.x;
    this.#py = this.y;

    addEventListener('pointermove', this.#onMove, { passive: true });
    addEventListener('pointerdown', this.#onMove, { passive: true });
    document.addEventListener('pointerout', (e) => {
      if (!e.relatedTarget) this.active = false;
    });
  }

  #px;
  #py;

  #onMove = (e) => {
    this.x = e.clientX;
    this.y = e.clientY;
    this.active = true;
  };

  /** Smoothed position normalised to -1…1 across the viewport. */
  get nx() { return (this.sx / innerWidth) * 2 - 1; }
  get ny() { return (this.sy / innerHeight) * 2 - 1; }

  update(dt) {
    const safe = Math.max(dt, 1e-4);
    this.vx = damp(this.vx, (this.x - this.#px) / safe, 18, dt);
    this.vy = damp(this.vy, (this.y - this.#py) / safe, 18, dt);
    this.#px = this.x;
    this.#py = this.y;
    this.sx = damp(this.sx, this.x, 4, dt);
    this.sy = damp(this.sy, this.y, 4, dt);
  }
}
