import { Emitter } from '../core/Emitter.js';
import { clamp, damp } from '../core/math.js';
import { reducedMotion } from '../core/dom.js';
import { PosterCard } from './PosterCard.js';

const PERSPECTIVE = 1600;

/**
 * The timeline itself: a horizontal track of posters you travel along by
 * dragging, scrolling or with the arrow keys. Movement is eased toward a
 * target and snaps to the nearest poster; the track's speed feeds back into
 * the cards so they lean into the motion.
 *
 * Events: 'change' (card nearest the centre), 'select' (card clicked),
 *         'dragstart', 'dragend'.
 */
export class TimeMachine extends Emitter {
  constructor(root, events, { ticker, pointer }) {
    super();
    this.root = root;
    this.track = root.querySelector('[data-track]');
    this.rail = root.querySelector('[data-rail]');
    this.pointer = pointer;

    this.cards = events.map((event) => new PosterCard(event, { pointer }));
    for (const card of this.cards) {
      this.track.append(card.el, card.stamp);
      card.el.addEventListener('click', (e) => this.#onCardClick(e, card));
      card.el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.emit('select', card);
        }
      });
      card.el.addEventListener('focus', () => {
        if (card.el.matches(':focus-visible')) this.goTo(card.index);
      });
    }

    this.current = 0;
    this.target = 0;
    this.velocity = 0;
    this.active = -1;
    this.paused = false; // ignores input (detail view open)
    this.frozen = false; // skips rendering entirely (detail view fully covering)
    this.drag = null;
    this.dragged = false;
    this.wheelTimer = 0;

    this.measure();
    addEventListener('resize', () => this.measure());
    root.addEventListener('pointerdown', this.#onDown);
    addEventListener('pointermove', this.#onMove, { passive: true });
    addEventListener('pointerup', this.#onUp);
    addEventListener('pointercancel', this.#onUp);
    addEventListener('wheel', this.#onWheel, { passive: false });
    addEventListener('keydown', this.#onKey);
    ticker.add((dt) => this.update(dt));
  }

  get max() { return (this.cards.length - 1) * this.step; }

  measure() {
    this.rect = this.root.getBoundingClientRect();
    this.width = this.rect.width;
    this.height = this.rect.height;
    const first = this.cards[0].el;
    this.cardW = first.offsetWidth;
    this.cardH = first.offsetHeight;
    this.step = this.cardW * (this.width < 640 ? 1.16 : 1.38);

    const block = this.cardH + 70;
    const top = Math.max(0, (this.height - block) / 2);
    this.cy = top + this.cardH / 2;
    this.root.style.setProperty('--rail-y', `${top + this.cardH + 34}px`);
    for (const card of this.cards) card.layout(this.cardW, this.cardH);

    const keep = Math.max(this.active, 0);
    this.current = this.target = keep * this.step;
  }

  indexAt(x) {
    return clamp(Math.round(x / this.step), 0, this.cards.length - 1);
  }

  goTo(index, { instant = false } = {}) {
    this.target = clamp(index, 0, this.cards.length - 1) * this.step;
    if (instant) this.current = this.target;
  }

  stepBy(dir) {
    this.goTo(this.indexAt(this.target) + dir);
  }

  cardById(id) {
    return this.cards.find((c) => c.event.id === id) ?? null;
  }

  /** Cards rise in from below, then the track glides forward to `to`. */
  intro(to, { instant = false } = {}) {
    const skip = instant || reducedMotion();
    const from = skip ? to : Math.max(0, to - 3.5);
    this.current = this.target = from * this.step;
    const order = [...this.cards].sort((a, b) => Math.abs(a.index - to) - Math.abs(b.index - to));
    order.forEach((card, i) => card.show(skip ? 0 : 250 + i * 70, skip));
    if (!skip) setTimeout(() => this.goTo(to), 650);
  }

  /** Where a card appears on screen, after perspective — used for the flight to the detail view. */
  flightState(card) {
    const ox = this.width / 2;
    const oy = this.height / 2;
    const s = PERSPECTIVE / (PERSPECTIVE - card.z);
    return {
      x: this.rect.left + ox + (card.x - ox) * s,
      y: this.rect.top + oy + (card.y - oy) * s,
      w: card.w * s * card.scale,
      rotX: card.rotX,
      rotY: card.rotY,
      rotZ: card.rotZ,
    };
  }

  #onCardClick(e, card) {
    if (this.dragged) {
      e.preventDefault();
      return;
    }
    this.emit('select', card);
  }

  #onDown = (e) => {
    if (this.paused || e.button !== 0) return;
    this.dragged = false;
    this.drag = { id: e.pointerId, type: e.pointerType, x: e.clientX, y: e.clientY, start: this.target, lastX: e.clientX, lastT: performance.now(), v: 0, engaged: false };
  };

  #onMove = (e) => {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    if (!d.engaged) {
      if (Math.abs(dx) < 6) return;
      // On touch, a mostly-vertical swipe isn't ours.
      if (d.type === 'touch' && Math.abs(e.clientY - d.y) > Math.abs(dx)) {
        this.drag = null;
        return;
      }
      d.engaged = true;
      this.dragged = true;
      this.root.classList.add('is-dragging');
      this.emit('dragstart');
    }
    const now = performance.now();
    const v = (e.clientX - d.lastX) / Math.max(now - d.lastT, 1);
    d.v = d.v * 0.2 + v * 0.8;
    d.lastX = e.clientX;
    d.lastT = now;

    let t = d.start - dx * 1.3;
    if (t < 0) t *= 0.32;
    else if (t > this.max) t = this.max + (t - this.max) * 0.32;
    this.target = t;
  };

  #onUp = (e) => {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    this.drag = null;
    if (!d.engaged) return;
    this.root.classList.remove('is-dragging');
    this.emit('dragend');
    const held = performance.now() - d.lastT > 90;
    const fling = held ? 0 : -d.v * 260;
    this.goTo(this.indexAt(this.target + fling));
  };

  #onWheel = (e) => {
    if (this.paused) return;
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const px = e.deltaMode === 1 ? delta * 32 : delta;
    this.target = clamp(this.target + px * 1.1, -this.step * 0.3, this.max + this.step * 0.3);
    clearTimeout(this.wheelTimer);
    this.wheelTimer = setTimeout(() => this.goTo(this.indexAt(this.target)), 160);
  };

  #onKey = (e) => {
    if (this.paused || e.metaKey || e.ctrlKey || e.altKey) return;
    const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
    if (e.key in moves) {
      e.preventDefault();
      this.stepBy(moves[e.key]);
    } else if (e.key === 'Home') this.goTo(0);
    else if (e.key === 'End') this.goTo(this.cards.length - 1);
  };

  update(dt) {
    if (this.frozen && Math.abs(this.target - this.current) < 0.5) return;
    const prev = this.current;
    const dragging = Boolean(this.drag?.engaged);
    this.current = damp(this.current, this.target, dragging ? 16 : 6.5, dt);
    this.velocity = damp(this.velocity, (this.current - prev) / Math.max(dt, 1e-4), 10, dt);

    const index = this.indexAt(this.current);
    if (index !== this.active) {
      this.active = index;
      this.cards.forEach((c) => c.setActive(c.index === index));
      this.emit('change', this.cards[index]);
    }

    const ctx = {
      originX: this.width / 2 - this.current,
      step: this.step,
      width: this.width,
      cy: this.cy,
      left: this.rect.left,
      top: this.rect.top,
      velocity: this.velocity,
      dragging,
      reduced: reducedMotion(),
      dt,
    };
    for (const card of this.cards) card.update(ctx);
    this.rail.style.backgroundPosition = `${-this.current}px 50%, 0 50%`;
  }
}
