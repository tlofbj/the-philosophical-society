import { esc } from '../core/dom.js';

/**
 * Base class for a poster design. Subclasses return markup from render();
 * every size inside a poster is in container units (cqw), so the same
 * poster renders crisply as a small card or full-size in the detail view.
 */
export class PosterTemplate {
  constructor(event) {
    this.event = event;
  }

  get className() { return ''; }

  render() { return ''; }

  /** The outer .poster is the size container; the design sits inside it so its padding doesn't shrink the cqw basis. */
  mount() {
    const node = document.createElement('div');
    node.className = 'poster';
    const design = document.createElement('div');
    design.className = `poster__design ${this.className}`.trim();
    design.innerHTML = this.render();
    node.append(design);
    return node;
  }
}

/** A real poster image from assets/posters. fit: 'contain' letterboxes art that isn't 3:4 on bg. */
export class ImagePoster extends PosterTemplate {
  get className() { return this.event.poster.fit === 'contain' ? 'pd--image pd--contain' : 'pd--image'; }

  mount() {
    const node = super.mount();
    if (this.event.poster.bg) node.firstChild.style.background = this.event.poster.bg;
    return node;
  }

  render() {
    const { image, alt } = this.event.poster;
    return `<img src="${esc(image)}" alt="${esc(alt ?? `${this.event.kind} poster`)}" draggable="false" decoding="async">`;
  }
}
