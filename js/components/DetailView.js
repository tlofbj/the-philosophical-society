import { Emitter } from '../core/Emitter.js';
import { Spring } from '../core/Spring.js';
import { clamp, lerp, r3 } from '../core/math.js';
import { el, esc, pad2, reducedMotion } from '../core/dom.js';
import { PosterFactory } from '../posters/PosterFactory.js';

const LINKABLE = /(https?:\/\/[^\s)]+?)([.,!?]*(?:\s|\)|$))|([\w.]+@[\w-]+(?:\.[\w-]+)+)/g;

/** A bulletin's text as HTML: the club-name lead-in set apart, links and emails made clickable. */
function bulletinHTML(text) {
  const [, lead = '', body = text] = text.match(/^([A-Z‘'’ ]+:)\s*(.*)$/s) ?? [];
  const linked = esc(body).replace(LINKABLE, (m, url, tail, email) => (email
    ? `<a href="mailto:${email}">${email}</a>`
    : `<a href="${url}" target="_blank" rel="noopener">${url.replace(/^https?:\/\//, '')}</a>${tail}`));
  return `${lead ? `<b>${esc(lead)}</b> ` : ''}${linked}`;
}

const OPEN_SPRING = { stiffness: 120, damping: 17 };
const CLOSE_SPRING = { stiffness: 150, damping: 23 };

/**
 * The full view of one meeting. Opening lifts a copy of the poster off the
 * wall and flies it, on a spring, into the left column while the details
 * stagger in on the right. Once it lands, the copy is docked into the layout
 * so it scrolls naturally; closing reverses the flight back to its card.
 *
 * States: closed → opening → open → closing → closed.
 * Events: 'close', 'step' (±1), 'docked', 'closing', 'closed'.
 */
export class DetailView extends Emitter {
  constructor(root, { ticker, pointer, layer, page, total }) {
    super();
    this.root = root;
    this.pointer = pointer;
    this.layer = layer;
    this.page = page;
    this.total = total;
    this.scroller = root.querySelector('[data-scroller]');
    this.slot = root.querySelector('[data-slot]');
    this.info = root.querySelector('[data-info]');
    this.counter = root.querySelector('[data-counter]');
    this.prevBtn = root.querySelector('[data-prev]');
    this.nextBtn = root.querySelector('[data-next]');
    this.closeBtn = root.querySelector('[data-close]');

    this.state = 'closed';
    this.card = null;
    this.flyer = null;
    this.getFrom = null;
    this.from = null;
    this.to = null;
    this.progress = new Spring(0, OPEN_SPRING);
    this.tiltX = new Spring(0, { stiffness: 120, damping: 14 });
    this.tiltY = new Spring(0, { stiffness: 120, damping: 14 });
    this.slotRect = null;

    this.closeBtn.addEventListener('click', () => this.emit('close'));
    this.prevBtn.addEventListener('click', () => this.emit('step', -1));
    this.nextBtn.addEventListener('click', () => this.emit('step', 1));
    this.scroller.addEventListener('click', (e) => {
      if (e.target === this.scroller || e.target.matches('[data-grid]')) this.emit('close');
    });
    this.scroller.addEventListener('scroll', () => { this.slotRect = null; }, { passive: true });
    addEventListener('resize', () => { this.slotRect = null; });
    addEventListener('keydown', this.#onKey);
    ticker.add((dt) => this.update(dt));
  }

  get isOpen() {
    return this.state === 'opening' || this.state === 'open';
  }

  /** @param getFrom returns the card's current on-screen state (see TimeMachine.flightState). */
  open(card, getFrom) {
    if (this.state !== 'closed') return;
    this.state = 'opening';
    this.card = card;
    this.getFrom = getFrom;
    this.from = getFrom();

    this.root.hidden = false;
    this.page.inert = true;
    this.scroller.scrollTop = 0;
    this.#render(card.event);
    this.root.getBoundingClientRect();
    this.root.classList.add('is-open');
    this.info.classList.add('is-in');

    this.to = this.#slotState();
    this.flyer = this.#createFlyer(card.event);
    this.flyer.style.width = `${this.to.w}px`;
    this.flyer.style.height = `${this.to.h}px`;
    this.layer.append(this.flyer);
    card.setAway(true);

    this.progress.configure(OPEN_SPRING);
    this.progress.set(0);
    this.progress.target = 1;
    if (reducedMotion()) this.progress.set(1);
    this.#place();
    this.closeBtn.focus({ preventScroll: true });
  }

  close() {
    if (this.state === 'closed' || this.state === 'closing') return;
    if (this.state === 'open') {
      // Undock: lift the poster back out of the layout at its current spot.
      this.to = this.#slotState();
      this.flyer.classList.remove('is-docked');
      this.flyer.style.width = `${this.to.w}px`;
      this.flyer.style.height = `${this.to.h}px`;
      this.flyer.querySelector('.flyer__inner').style.transform = '';
      this.layer.append(this.flyer);
      this.progress.set(1);
    }
    this.state = 'closing';
    this.progress.configure(CLOSE_SPRING);
    this.progress.target = 0;
    if (reducedMotion()) this.progress.set(0);
    this.root.classList.remove('is-open', 'is-docked');
    this.info.classList.remove('is-in');
    this.emit('closing');
    this.#place();
  }

  /** Move to the neighbouring meeting while open. */
  swap(card, dir) {
    if (this.state !== 'open') return;
    const old = this.flyer;
    old.classList.add(dir > 0 ? 'leave-left' : 'leave-right');
    setTimeout(() => old.remove(), 800);

    this.card.setAway(false);
    this.card = card;
    card.setAway(true);

    const next = this.#createFlyer(card.event);
    next.classList.add('is-docked', dir > 0 ? 'enter-right' : 'enter-left');
    this.slot.append(next);
    next.getBoundingClientRect();
    next.classList.remove('enter-right', 'enter-left');
    this.flyer = next;

    this.info.classList.remove('is-in');
    this.#render(card.event);
    this.info.getBoundingClientRect();
    this.info.classList.add('is-in');
    this.scroller.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  #onKey = (e) => {
    if (!this.isOpen) return;
    if (e.key === 'Escape') this.emit('close');
    else if (e.key === 'ArrowRight') this.emit('step', 1);
    else if (e.key === 'ArrowLeft') this.emit('step', -1);
  };

  #createFlyer(event) {
    const flyer = el('div', 'flyer');
    const inner = el('div', 'flyer__inner');
    inner.append(PosterFactory.create(event), el('div', 'card__glare'));
    flyer.append(inner);
    return flyer;
  }

  #slotState() {
    const r = this.slot.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, rotX: 0, rotY: 0, rotZ: 0 };
  }

  #place() {
    const p = this.progress.value;
    const a = this.from;
    const b = this.to;
    const t = clamp(p, 0, 1);
    const arc = Math.sin(Math.PI * t) * -36;
    const swing = clamp(this.progress.velocity * 5, -18, 18);
    const x = lerp(a.x, b.x, p);
    const y = lerp(a.y, b.y, p) + arc;
    const s = lerp(a.w, b.w, p) / b.w;
    this.flyer.style.transform =
      `translate3d(${r3(x - b.w / 2)}px,${r3(y - b.h / 2)}px,0) ` +
      `rotateX(${r3(lerp(a.rotX, 0, t))}deg) rotateY(${r3(lerp(a.rotY, 0, t) - swing)}deg) ` +
      `rotateZ(${r3(lerp(a.rotZ, 0, t) + swing * 0.25)}deg) scale(${r3(s)})`;
  }

  #dock() {
    this.state = 'open';
    this.progress.set(1);
    this.flyer.style.transform = '';
    this.flyer.style.width = '';
    this.flyer.style.height = '';
    this.flyer.classList.add('is-docked');
    this.slot.append(this.flyer);
    this.root.classList.add('is-docked');
    this.emit('docked');
  }

  #finishClose() {
    this.state = 'closed';
    this.flyer.remove();
    this.flyer = null;
    this.card.setAway(false);
    this.root.hidden = true;
    this.page.inert = false;
    this.card.el.focus({ preventScroll: true });
    this.emit('closed', this.card);
  }

  update(dt) {
    if (this.state === 'opening' || this.state === 'closing') {
      // While closing, chase the card live so the poster lands exactly on it.
      if (this.state === 'closing') this.from = this.getFrom();
      this.progress.update(dt);
      this.#place();
      if (this.progress.isSettled(0.002)) {
        if (this.state === 'opening') this.#dock();
        else this.#finishClose();
      }
    } else if (this.state === 'open' && this.flyer && this.pointer.fine && !reducedMotion()) {
      this.slotRect ??= this.slot.getBoundingClientRect();
      const r = this.slotRect;
      const lx = clamp((this.pointer.x - (r.left + r.width / 2)) / r.width, -1, 1);
      const ly = clamp((this.pointer.y - (r.top + r.height / 2)) / r.height, -1, 1);
      this.tiltY.target = lx * 9;
      this.tiltX.target = -ly * 7;
      const inner = this.flyer.querySelector('.flyer__inner');
      inner.style.transform = `rotateX(${r3(this.tiltX.update(dt))}deg) rotateY(${r3(this.tiltY.update(dt))}deg)`;
      const glare = inner.querySelector('.card__glare');
      glare.style.opacity = 0.7;
      glare.style.transform = `translate3d(${r3(lx * 30)}%,${r3(ly * 30)}%,0)`;
    }
  }

  #render(ev) {
    let i = 0;
    const reveal = (cls = '') => `class="${cls} reveal" style="--i:${i++}"`;

    const meta = [
      ['Date', ev.longDate],
      ['Time', ev.time],
      ['Place', ev.place],
      ...ev.people,
      ev.attendance ? ['Attendance', `${ev.attendance} members`] : null,
    ].filter((row) => row && row[1]);

    const sections = ev.sections.map((s) => `
      <section ${reveal('info__section')}>
        <h3>${esc(s.heading)}</h3>
        <ol>${s.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ol>
      </section>`).join('');

    const bulletins = ev.bulletins.length ? `
      <section ${reveal('info__section')}>
        <h3>From the bulletin</h3>
        <div class="bulletins">${ev.bulletins.map((b) => `
          <figure class="bulletin">
            <figcaption><span>ʻIolani Bulletin</span>${b.note ? `<span>${esc(b.note)}</span>` : ''}</figcaption>
            <p>${bulletinHTML(b.text)}</p>
          </figure>`).join('')}
        </div>
      </section>` : '';

    const media = ev.media.map((m) => `
      <figure ${reveal('info__media')}>
        <a href="${esc(m.image)}" target="_blank" rel="noopener" data-cursor="view"><img src="${esc(m.image)}" alt="${esc(m.alt)}" loading="lazy" decoding="async"></a>
        ${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ''}
      </figure>`).join('');

    const figures = ev.figures ? `
      <section ${reveal('info__section')}>
        <h3>${esc(ev.figures.heading)}</h3>
        <ul class="info__figures">${ev.figures.items.map(([value, label]) => `
          <li><b>${esc(value)}</b><span>${esc(label)}</span></li>`).join('')}
        </ul>
      </section>` : '';

    const links = ev.links.length ? `
      <section ${reveal('info__section')}>
        <h3>Readings &amp; links</h3>
        <ul class="info__links">${ev.links.map((l) => `
          <li><a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}<span aria-hidden="true">↗</span></a>
          ${l.note ? `<small>${esc(l.note)}</small>` : ''}</li>`).join('')}
        </ul>
      </section>` : '';

    this.info.innerHTML = `
      <p ${reveal('info__kicker')}><span>${pad2(ev.index + 1)}</span>${esc(ev.kind)}</p>
      <h2 ${reveal('info__title')} id="detail-title">${esc(ev.title)}</h2>
      ${ev.question ? `<p ${reveal('info__question')}>${esc(ev.question)}</p>` : ''}
      <dl ${reveal('info__meta')}>${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      ${ev.summary.map((para) => `<p ${reveal('info__summary')}>${esc(para)}</p>`).join('')}
      ${ev.quote ? `<blockquote ${reveal('info__quote')}>“${esc(ev.quote)}”${ev.quoteBy ? `<cite>${esc(ev.quoteBy)}</cite>` : ''}</blockquote>` : ''}
      ${media}
      ${figures}
      ${bulletins}
      ${sections}
      ${links}`;

    this.counter.textContent = `${pad2(ev.index + 1)} / ${pad2(this.total)}`;
    this.prevBtn.disabled = ev.index === 0;
    this.nextBtn.disabled = ev.index === this.total - 1;
  }
}
