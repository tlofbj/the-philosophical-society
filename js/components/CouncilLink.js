import { Emitter } from '../core/Emitter.js';

/**
 * The masthead line "The Philosophical Society @ ʻIolani School", turned into
 * the way in to the council. A dotted underline and a small hint say it can be
 * opened; the council's poster then flies out of the words, and back into
 * them on close. It stands in for a PosterCard as far as DetailView is
 * concerned: it has an event, an element to return focus to, and setAway().
 *
 * Events: 'select'.
 */
export class CouncilLink extends Emitter {
  constructor(el, event) {
    super();
    this.el = el;
    this.event = event;
    this.index = event.index;

    const year = event.poster.year;
    el.setAttribute('aria-label', `Meet the ${event.title}`);
    el.querySelector('[data-council-hint]').textContent = year ? `Meet the ${year} Council` : 'Meet the Council';
    el.addEventListener('click', () => this.emit('select', this));
  }

  /** Underlines the line while its poster is out. */
  setAway(on) {
    this.el.classList.toggle('is-away', on);
  }

  /** The poster starts small and tilted, sitting on the words. */
  flightState() {
    const r = this.el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      w: r.height * 1.4,
      rotX: 0,
      rotY: 0,
      rotZ: -8,
    };
  }
}
