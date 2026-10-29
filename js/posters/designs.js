import { PosterTemplate } from './PosterTemplate.js';
import { esc } from '../core/dom.js';

/*
 * Built-in poster designs for meetings that never had a printed poster.
 * Each has a static `id` that events reference via poster.template.
 * Styles live in css/posters.css under the matching .pd--* class.
 */

export class IdealSocietyPoster extends PosterTemplate {
  static id = 'ideal-society';
  get className() { return 'pd pd--ideal'; }

  render() {
    const e = this.event;
    return `
      <header class="pd__head"><span>ʻIolani School</span><span>Philosophic Society</span></header>
      <p class="pd__no">${esc(e.kind)}</p>
      <h3 class="pd__title">What makes an <em>ideal</em> society?</h3>
      <div class="pd__grid">
        <div><i class="g g--circle"></i>Liberalism</div>
        <div><i class="g g--square"></i>Socialism</div>
        <div><i class="g g--tri"></i>Meritocracy</div>
        <div><i class="g g--x"></i>Anarchy</div>
      </div>
      <p class="pd__veil">Choose from behind the veil of ignorance.</p>
      <footer class="pd__foot"><span>${esc(e.shortDate)}</span><span>Lunch · W310</span></footer>`;
  }
}

export class JustWarPoster extends PosterTemplate {
  static id = 'just-war';
  get className() { return 'pd pd--war'; }

  render() {
    const e = this.event;
    return `
      <header class="pd__head"><span>${esc(e.kind)}</span><span>${esc(e.shortDate)} · W310</span></header>
      <p class="pd__lede">When is it <em>just</em><br>to go to</p>
      <ol class="pd__criteria">
        <li>Just cause</li>
        <li>Last resort</li>
        <li>Legitimate authority</li>
        <li>Probability of success</li>
      </ol>
      <h3 class="pd__war">War<span>?</span></h3>`;
  }
}

export class IgnorancePoster extends PosterTemplate {
  static id = 'ignorance';
  get className() { return 'pd pd--ignorance'; }

  render() {
    const e = this.event;
    const lines = [92, 78, 100, 64, 86, 40]
      .map((w, i) => `<i class="${i === 1 || i === 4 ? 'on' : ''}" style="--w:${w}%"></i>`)
      .join('');
    return `
      <header class="pd__head">${esc(e.kind)} — Philosophic Society</header>
      <h3 class="pd__title">Does <span class="pd__redact">ignorance</span> justify moral failure?</h3>
      <div class="pd__doc" aria-hidden="true">${lines}</div>
      <p class="pd__cite">Rosen, “Culpability and Ignorance” (2003)</p>
      <footer class="pd__foot"><span>${esc(e.shortDate)}</span><span>Lunch · W310</span></footer>`;
  }
}

export class PizzaPoster extends PosterTemplate {
  static id = 'pizza';
  get className() { return 'pd pd--pizza'; }

  render() {
    const e = this.event;
    return `
      <header class="pd__head"><span>${esc(e.kind)}</span><span>2024–25</span></header>
      <div class="pd__pie" aria-hidden="true"></div>
      <h3 class="pd__title">Fin.</h3>
      <p class="pd__sub">Pizza, celebration <em>&amp;</em> reflections</p>
      <footer class="pd__foot"><span>${esc(e.shortDate)}</span><span>11:30 · W310</span></footer>`;
  }
}

export class UpcomingPoster extends PosterTemplate {
  static id = 'upcoming';
  static #uid = 0;
  get className() { return 'pd pd--next'; }

  render() {
    // Each poster instance (card + detail copy) needs its own path id.
    const id = `pd-ring-${++UpcomingPoster.#uid}`;
    // textLength spreads the phrase evenly around the whole circle (2π × 80 ≈ 502).
    return `
      <svg class="pd__ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id="${id}" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs>
        <text><textPath href="#${id}" textLength="496" lengthAdjust="spacing">Next assembly · Topic to be chosen ·</textPath></text>
      </svg>
      <span class="pd__q" aria-hidden="true">?</span>
      <p class="pd__line">The next question<br><em>is yet to be asked.</em></p>
      <footer class="pd__foot"><span>Date TBA</span><span>Open to all</span></footer>`;
  }
}
