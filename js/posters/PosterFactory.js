import { ImagePoster } from './PosterTemplate.js';
import * as designs from './designs.js';

/** Turns an event into a poster element, picking an image or a registered design. */
export class PosterFactory {
  static #registry = new Map(
    Object.values(designs).filter((Design) => Design.id).map((Design) => [Design.id, Design]),
  );

  static register(Design) {
    PosterFactory.#registry.set(Design.id, Design);
  }

  static create(event) {
    const Design = event.poster.image ? ImagePoster : PosterFactory.#registry.get(event.poster.template);
    if (!Design) throw new Error(`No poster design "${event.poster.template}" for event "${event.id}"`);
    return new Design(event).mount();
  }
}
