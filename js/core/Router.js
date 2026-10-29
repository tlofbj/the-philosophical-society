import { Emitter } from './Emitter.js';

/**
 * Hash routing (#/event-id) so every poster has a shareable link and the
 * browser's back button closes it. No server needed, so it works on GitHub Pages.
 */
export class Router extends Emitter {
  constructor() {
    super();
    addEventListener('popstate', () => this.emit('change', this.current));
  }

  get current() {
    const match = location.hash.match(/^#\/([\w-]+)/);
    return match ? match[1] : null;
  }

  push(id) {
    history.pushState({ timeMachine: true }, '', `#/${id}`);
  }

  replace(id) {
    history.replaceState(history.state, '', id ? `#/${id}` : location.pathname + location.search);
  }

  /** Step back if we added the entry ourselves; otherwise just clean the URL. */
  close() {
    if (history.state?.timeMachine) history.back();
    else this.replace(null);
  }
}
