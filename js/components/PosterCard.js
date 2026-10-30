import { Spring } from '../core/Spring.js';
import { clamp, r3 } from '../core/math.js';
import { el, esc } from '../core/dom.js';
import { PosterFactory } from '../posters/PosterFactory.js';

/**
 * One poster on the wall, plus its date stamp on the rail. The TimeMachine
 * decides where the card sits; the card adds its own life on top: hover tilt
 * toward the cursor, lift, glare, parallax depth and the entrance drop.
 */
export class PosterCard {
  constructor(event, { pointer }) {
    this.event = event;
    this.index = event.index;
    this.pointer = pointer;

    this.el = el('article', 'card');
    this.el.tabIndex = 0;
    this.el.setAttribute('role', 'button');
    this.el.setAttribute('aria-label', `${event.kind}: ${event.title}. ${event.longDate}`);
    this.el.dataset.cursor = 'view';
    if (event.ratio !== 3 / 4) this.el.style.aspectRatio = String(event.ratio);

    this.shadow = el('div', 'card__shadow');
    this.body = el('div', 'card__body');
    this.glare = el('div', 'card__glare');
    this.body.append(PosterFactory.create(event), this.glare);
    this.el.append(this.shadow, this.body);

    const season = event.opensSeason ? `<span class="stamp__season">${esc(event.season)}</span>` : '';
    this.stamp = el('div', 'stamp', `<i class="stamp__dot"></i><span class="stamp__date">${esc(event.stamp)}</span>${season}`);
    this.stamp.setAttribute('aria-hidden', 'true');

    this.lift = new Spring(0, { stiffness: 210, damping: 20 });
    this.tiltX = new Spring(0, { stiffness: 160, damping: 16 });
    this.tiltY = new Spring(0, { stiffness: 160, damping: 16 });
    this.enter = new Spring(0, { stiffness: 70, damping: 13 });

    // Deterministic "random" depth so parallax layers differ per card.
    this.depth = 0.55 + ((this.index * 7) % 10) / 10;
    this.hovered = false;
    this.w = 0;
    this.h = 0;
    this.dy = 0;
    Object.assign(this, { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: event.tilt, scale: 1 });

    this.el.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && this.setHover(true));
    this.el.addEventListener('pointerleave', () => this.setHover(false));
  }

  /** w × h is the standard 3:4 slot; a card of another shape keeps the width and sits on the slot's bottom edge. */
  layout(w, h) {
    this.w = w;
    this.h = w / this.event.ratio;
    this.dy = (h - this.h) / 2;
  }

  setHover(on) {
    if (this.hovered === on) return;
    this.hovered = on;
    this.el.classList.toggle('is-hover', on);
    this.lift.target = on ? 1 : 0;
  }

  setActive(on) {
    this.el.classList.toggle('is-active', on);
    this.stamp.classList.toggle('is-active', on);
  }

  /** Hidden while its copy is flying in the detail view. */
  setAway(on) {
    this.el.classList.toggle('is-away', on);
    if (on) this.setHover(false);
  }

  show(delay = 0, instant = false) {
    if (instant) return this.enter.set(1);
    setTimeout(() => { this.enter.target = 1; }, delay);
  }

  update({ originX, step, width, cy, left, top, velocity, dt, dragging, reduced }) {
    const p = this.pointer;
    const cx = originX + this.index * step;
    const offset = (cx - width / 2) / width;

    let lx = 0;
    let ly = 0;
    if (this.hovered && !dragging && !reduced) {
      lx = clamp((p.x - left - this.x) / (this.w / 2), -1, 1);
      ly = clamp((p.y - top - this.y) / (this.h / 2), -1, 1);
    }
    this.tiltX.target = -ly * 10;
    this.tiltY.target = lx * 12;

    const lift = this.lift.update(dt);
    const enter = this.enter.update(dt);
    this.tiltX.update(dt);
    this.tiltY.update(dt);

    const depth = p.fine && !reduced ? this.depth : 0;
    const speed = reduced ? 0 : clamp(velocity / 2600, -1, 1);

    this.x = cx + p.nx * depth * 18 + lx * 8 * lift;
    this.y = cy + this.dy + p.ny * depth * 12 + ly * 8 * lift - lift * 12 + (1 - enter) * innerHeight * 0.7;
    this.z = reduced ? 0 : -Math.abs(offset) * 170 + lift * 70;
    this.rotX = this.tiltX.value;
    this.rotY = (reduced ? 0 : -offset * 20) + this.tiltY.value - speed * 26;
    this.rotZ = this.event.tilt * (1 - lift) - speed * 3 + (1 - enter) * this.event.tilt * 4;
    this.scale = 1 - Math.abs(speed) * 0.07;

    this.el.style.transform =
      `translate3d(${r3(this.x - this.w / 2)}px,${r3(this.y - this.h / 2)}px,${r3(this.z)}px) ` +
      `rotateX(${r3(this.rotX)}deg) rotateY(${r3(this.rotY)}deg) rotateZ(${r3(this.rotZ)}deg) scale(${r3(this.scale)})`;
    this.el.style.opacity = r3(clamp(enter * 1.4, 0, 1));

    this.shadow.style.transform = `translate3d(0,${r3(10 + lift * 22)}px,0) scale(${r3(0.94 + lift * 0.05)})`;
    this.shadow.style.opacity = r3(0.5 - lift * 0.12);
    this.glare.style.opacity = r3(lift * 0.9);
    this.glare.style.transform = `translate3d(${r3(lx * 28)}%,${r3(ly * 28)}%,0)`;

    this.stamp.style.transform = `translate3d(${r3(cx)}px,0,0)`;
    this.stamp.style.opacity = r3(clamp(enter * 2 - 1, 0, 1) * clamp(1.25 - Math.abs(offset) * 1.3, 0.2, 1));
  }
}
