import { Spring } from '../core/Spring.js';
import { clamp, damp, r3 } from '../core/math.js';

const STATES = {
  default: { scale: 1, label: '' },
  link: { scale: 1.6, label: '' },
  drag: { scale: 1.9, label: 'Drag' },
  dragging: { scale: 1.35, label: '' },
  view: { scale: 2.5, label: 'View' },
  close: { scale: 2.1, label: 'Close' },
  none: { scale: 0.6, label: '' },
};

/**
 * Custom cursor: a dot that tracks the pointer, a ring that trails it and
 * stretches with speed, and a label that appears over things you can act on.
 * Elements opt in with data-cursor="view|drag|close|…". Also drives the soft
 * ambient glow behind the page. Disabled on touch screens.
 */
export class Cursor {
  constructor(root, { ticker, pointer, ambient }) {
    this.pointer = pointer;
    this.ambient = ambient;
    this.enabled = pointer.fine;
    if (!this.enabled) {
      root.remove();
      return;
    }
    document.documentElement.classList.add('has-cursor');
    this.root = root;
    this.ring = root.querySelector('.cursor__ring');
    this.dot = root.querySelector('.cursor__dot');
    this.label = root.querySelector('.cursor__label');

    this.x = this.dx = this.gx = pointer.x;
    this.y = this.dy = this.gy = pointer.y;
    this.scale = new Spring(1, { stiffness: 260, damping: 20 });
    this.press = new Spring(1, { stiffness: 400, damping: 22 });
    this.angle = 0;
    this.state = 'default';
    this.override = null;
    this.hoverState = 'default';

    addEventListener('pointerover', (e) => this.#resolve(e.target));
    addEventListener('pointerdown', () => { this.press.target = 0.82; });
    addEventListener('pointerup', () => { this.press.target = 1; });
    ticker.add((dt) => this.update(dt));
  }

  #resolve(target) {
    const host = target.closest?.('[data-cursor]');
    let state = host?.dataset.cursor;
    if (!state || state === 'default') state = target.closest?.('a, button:not(:disabled)') ? 'link' : 'default';
    this.hoverState = state;
    this.#apply();
  }

  /** Force a state regardless of what's under the pointer (e.g. while dragging). */
  setOverride(state) {
    this.override = state;
    // Things may have moved under a still pointer, so look again.
    if (!state) this.#resolve(document.elementFromPoint(this.pointer.x, this.pointer.y) ?? document.body);
    this.#apply();
  }

  #apply() {
    const state = this.override ?? this.hoverState;
    if (state === this.state) return;
    this.state = state;
    this.root.dataset.state = state;
    const { scale, label } = STATES[state] ?? STATES.default;
    this.scale.target = scale;
    if (label) this.label.textContent = label;
  }

  update(dt) {
    const p = this.pointer;
    this.dx = damp(this.dx, p.x, 38, dt);
    this.dy = damp(this.dy, p.y, 38, dt);
    this.x = damp(this.x, p.x, 13, dt);
    this.y = damp(this.y, p.y, 13, dt);
    const scale = this.scale.update(dt) * this.press.update(dt);

    // Stretch the ring along its direction of travel.
    const speed = Math.hypot(p.vx, p.vy);
    const stretch = this.state === 'default' || this.state === 'link' ? clamp(speed / 5000, 0, 0.4) : 0;
    if (speed > 60) this.angle = Math.atan2(p.vy, p.vx);

    this.root.style.opacity = p.active ? 1 : 0;
    this.ring.style.transform =
      `translate3d(${r3(this.x)}px,${r3(this.y)}px,0) rotate(${r3(this.angle)}rad) ` +
      `scale(${r3(scale * (1 + stretch))},${r3(scale * (1 - stretch * 0.5))})`;
    this.label.style.transform = `translate3d(${r3(this.x)}px,${r3(this.y)}px,0)`;
    this.dot.style.transform = `translate3d(${r3(this.dx)}px,${r3(this.dy)}px,0)`;

    if (this.ambient) {
      this.gx = damp(this.gx, p.x, 2.2, dt);
      this.gy = damp(this.gy, p.y, 2.2, dt);
      this.ambient.style.transform = `translate3d(${r3(this.gx)}px,${r3(this.gy)}px,0)`;
    }
  }
}
