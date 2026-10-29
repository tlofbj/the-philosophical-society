import { Ticker } from './core/Ticker.js';
import { Pointer } from './core/Pointer.js';
import { Router } from './core/Router.js';
import { clamp } from './core/math.js';
import { SocietyEvent } from './models/SocietyEvent.js';
import { EVENTS } from './data/events.js';
import { Cursor } from './components/Cursor.js';
import { KineticTitle } from './components/KineticTitle.js';
import { TimeMachine } from './components/TimeMachine.js';
import { TimeDial } from './components/TimeDial.js';
import { DetailView } from './components/DetailView.js';

/** Builds every component and wires their events together. */
export class App {
  constructor(doc = document) {
    this.events = EVENTS.map((raw) => new SocietyEvent(raw)).sort(SocietyEvent.compare);
    this.events.forEach((event, i) => {
      event.index = i;
      event.opensSeason = Boolean(event.season) && event.season !== this.events[i - 1]?.season;
    });

    this.ticker = new Ticker();
    this.pointer = new Pointer();
    this.router = new Router();
    this.ticker.add((dt) => this.pointer.update(dt));

    const deps = { ticker: this.ticker, pointer: this.pointer };
    this.cursor = new Cursor(doc.querySelector('[data-cursor-root]'), { ...deps, ambient: doc.querySelector('[data-ambient]') });
    this.title = new KineticTitle(doc.querySelector('[data-title]'), deps);
    this.machine = new TimeMachine(doc.querySelector('[data-machine]'), this.events, deps);
    this.dial = new TimeDial(doc.querySelector('[data-dial]'));
    this.detail = new DetailView(doc.querySelector('[data-detail]'), {
      ...deps,
      layer: doc.querySelector('[data-flight]'),
      page: doc.querySelector('[data-page]'),
      total: this.events.length,
    });

    this.#wire();
  }

  #wire() {
    const { machine, dial, detail, cursor, router } = this;

    machine.on('change', (card) => dial.show(card.event, card.index, this.events.length));
    machine.on('select', (card) => this.open(card.event.id));
    machine.on('dragstart', () => cursor.enabled && cursor.setOverride('dragging'));
    machine.on('dragend', () => cursor.enabled && cursor.setOverride(null));
    dial.on('step', (dir) => machine.stepBy(dir));

    detail.on('close', () => this.close());
    detail.on('step', (dir) => this.step(dir));
    detail.on('docked', () => { machine.frozen = true; });
    detail.on('closing', () => { machine.frozen = false; });
    detail.on('closed', () => { machine.paused = false; });

    router.on('change', (id) => this.#sync(id));
  }

  /** The most recent meeting that has already happened. */
  get latestIndex() {
    const past = this.events.filter((e) => !e.isUpcoming);
    return past.length ? past[past.length - 1].index : 0;
  }

  start() {
    this.ticker.start();
    document.documentElement.classList.add('is-ready');
    const deepLink = this.machine.cardById(this.router.current);
    if (deepLink) {
      this.machine.intro(deepLink.index, { instant: true });
      requestAnimationFrame(() => this.#sync(deepLink.event.id));
    } else {
      this.machine.intro(this.latestIndex);
    }
  }

  open(id) {
    if (this.detail.state !== 'closed') return;
    this.router.push(id);
    this.#sync(id);
  }

  close() {
    this.detail.close();
    this.router.close();
  }

  step(dir) {
    const current = this.detail.card;
    if (!current || this.detail.state !== 'open') return;
    const index = clamp(current.index + dir, 0, this.events.length - 1);
    if (index === current.index) return;
    const card = this.machine.cards[index];
    this.router.replace(card.event.id);
    this.machine.goTo(index, { instant: true });
    this.detail.swap(card, dir);
  }

  /** Bring the detail view in line with the URL (clicks, back/forward, deep links). */
  #sync(id) {
    const card = this.machine.cardById(id);
    if (!card) {
      if (this.detail.isOpen) this.detail.close();
      return;
    }
    if (this.detail.state === 'closed') {
      this.machine.paused = true;
      this.machine.goTo(card.index);
      this.detail.open(card, () => this.machine.flightState(card));
    } else if (this.detail.state === 'open' && this.detail.card !== card) {
      this.machine.goTo(card.index, { instant: true });
      this.detail.swap(card, card.index > this.detail.card.index ? 1 : -1);
    }
  }
}
