/** Swaps a line of text by sliding the old one out and the new one in. */
export class TextSwap {
  constructor(node) {
    this.node = node;
    this.text = node.textContent;
    node.classList.add('swap');
    node.textContent = '';
    this.current = this.#item(this.text);
    node.append(this.current);
  }

  #item(text) {
    const span = document.createElement('span');
    span.className = 'swap__item';
    span.textContent = text;
    return span;
  }

  /** dir 1 slides upward (forward in time), -1 slides downward. */
  set(text, dir = 1) {
    if (text === this.text) return;
    this.text = text;
    const old = this.current;
    const next = this.#item(text);
    next.classList.add(dir > 0 ? 'from-below' : 'from-above');
    this.node.append(next);
    next.getBoundingClientRect(); // commit the start position before transitioning
    next.classList.remove('from-below', 'from-above');
    old.classList.add(dir > 0 ? 'to-above' : 'to-below');
    setTimeout(() => old.remove(), 700);
    this.current = next;
  }
}
