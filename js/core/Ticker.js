/** One requestAnimationFrame loop shared by every animated component. */
export class Ticker {
  #subscribers = new Set();
  #last = 0;
  #running = false;

  add(fn) {
    this.#subscribers.add(fn);
    return () => this.#subscribers.delete(fn);
  }

  start() {
    if (this.#running) return;
    this.#running = true;
    this.#last = performance.now();
    requestAnimationFrame(this.#frame);
  }

  #frame = (now) => {
    // Clamp so a backgrounded tab doesn't come back with one giant leap.
    const dt = Math.min((now - this.#last) / 1000, 1 / 30);
    this.#last = now;
    for (const fn of this.#subscribers) fn(dt);
    requestAnimationFrame(this.#frame);
  };
}
