import { PosterTemplate } from './PosterTemplate.js';
import { esc } from '../core/dom.js';

/*
 * Built-in poster designs for meetings that never had a printed poster.
 * Each has a static `id` that events reference via poster.template.
 * Styles live in css/posters.css under the matching .pd--* class.
 */

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

export class WrongdoingsPoster extends PosterTemplate {
  static id = 'wrongdoings';
  get className() { return 'pd pd--wrong'; }

  render() {
    const e = this.event;
    const [m, d, y] = [e.when.getMonth() + 1, e.when.getDate(), e.when.getFullYear()];
    return `
      <p class="pd__marks" aria-hidden="true">? ? ?</p>
      <h3 class="pd__title">${esc(e.question)}</h3>
      <p class="pd__rule"><i></i><span>${m}/${d}/${y}</span><i></i></p>
      <p class="pd__sig">Philosophic Society</p>`;
  }
}

export class FreeWillPoster extends PosterTemplate {
  static id = 'free-will';
  get className() { return `pd pd--will pd--will-${this.event.poster.part}`; }

  render() {
    const e = this.event;
    const part = e.poster.part === 2 ? 'II' : 'I';
    // Marionette strings, each hung at its own length; they sway on hover.
    const strings = [38, 62, 30, 54, 44]
      .map((h, i) => `<i style="--h:${h}cqw;--i:${i}"></i>`)
      .join('');
    return `
      <header class="pd__head"><span>${esc(e.kind)}</span><span>Part ${part}</span></header>
      <div class="pd__strings" aria-hidden="true">${strings}</div>
      <h3 class="pd__title">Free <em>Will</em></h3>
      <p class="pd__q">${esc(e.question)}</p>
      <footer class="pd__foot"><span>${esc(e.shortDate)}</span><span>${esc(e.poster.where)}</span></footer>`;
  }
}

export class RightsPoster extends PosterTemplate {
  static id = 'rights';
  get className() { return 'pd pd--rights'; }

  render() {
    const e = this.event;
    // poster.background: an image laid behind the design, faded so the type stays legible.
    const bg = e.poster.background
      ? `<img class="pd__bg" src="${esc(e.poster.background)}" alt="" draggable="false" decoding="async">`
      : '';
    return `${bg}
      <header class="pd__head"><span>${esc(e.kind)}</span><span>${esc(e.season)}</span></header>
      <h3 class="pd__title">Born <em>with</em> rights?</h3>
      <div class="pd__seal" aria-hidden="true"><span>UDHR</span><small>1948</small></div>
      <blockquote class="pd__article"><b>Article 1.</b> All human beings are born free and equal in dignity and rights.</blockquote>
      <footer class="pd__foot"><span>${esc(e.shortDate)}</span><span>${esc(e.poster.where)}</span></footer>`;
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
        <text><textPath href="#${id}" textLength="496" lengthAdjust="spacing">Next seminar · New topic every month ·</textPath></text>
      </svg>
      <span class="pd__q" aria-hidden="true">?</span>
      <p class="pd__line">The next question<br><em>is yet to be asked.</em></p>
      <footer class="pd__foot"><span>Monthly · W313</span><span>Open to all</span></footer>`;
  }
}
