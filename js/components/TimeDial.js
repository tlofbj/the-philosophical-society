import { Emitter } from '../core/Emitter.js';
import { pad2 } from '../core/dom.js';
import { Roller } from './Roller.js';
import { TextSwap } from './TextSwap.js';

/** The date readout under the timeline: rolling year, sliding month, prev/next. */
export class TimeDial extends Emitter {
  constructor(root) {
    super();
    this.root = root;
    this.date = root.querySelector('[data-date]');
    this.month = new TextSwap(root.querySelector('[data-month]'));
    this.day = new Roller(root.querySelector('[data-day]'), 2);
    this.year = new Roller(root.querySelector('[data-year]'), 4);
    this.label = new TextSwap(root.querySelector('[data-label]'));
    this.count = root.querySelector('[data-count]');
    this.live = root.querySelector('[data-live]');
    this.prev = root.querySelector('[data-prev]');
    this.next = root.querySelector('[data-next]');
    this.index = -1;

    this.prev.addEventListener('click', () => this.emit('step', -1));
    this.next.addEventListener('click', () => this.emit('step', 1));
  }

  show(event, index, total) {
    const dir = index >= this.index ? 1 : -1;
    this.index = index;
    this.date.classList.toggle('is-tba', !event.hasDate);
    this.month.set(event.hasDate ? event.month : 'Date to be announced', dir);
    this.day.set(event.day ?? '––');
    this.year.set(event.year ?? '––––');
    this.label.set(event.kind, dir);
    this.count.textContent = `${pad2(index + 1)} / ${pad2(total)}`;
    this.prev.disabled = index === 0;
    this.next.disabled = index === total - 1;
    this.live.textContent = `${event.kind}, ${event.longDate}`;
  }
}
