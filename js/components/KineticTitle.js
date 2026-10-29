import { Spring } from '../core/Spring.js';
import { r3 } from '../core/math.js';
import { reducedMotion } from '../core/dom.js';

/**
 * Splits the headline into letters that rise in on load, then lift and lean
 * toward the cursor as it passes over them, each on its own spring.
 */
export class KineticTitle {
  constructor(node, { ticker, pointer }) {
    this.node = node;
    this.pointer = pointer;
    const text = node.textContent.trim();
    node.setAttribute('aria-label', text);
    node.textContent = '';

    this.chars = [];
    let i = 0;
    text.split(' ').forEach((word, w) => {
      if (w > 0) node.append(' ');
      const wordEl = document.createElement('span');
      wordEl.className = 'word';
      wordEl.setAttribute('aria-hidden', 'true');
      for (const ch of word) {
        const outer = document.createElement('span');
        outer.className = 'char';
        const inner = document.createElement('span');
        inner.className = 'char__in';
        inner.style.setProperty('--i', i++);
        inner.textContent = ch;
        outer.append(inner);
        wordEl.append(outer);
        this.chars.push({
          el: outer,
          cx: 0,
          cy: 0,
          y: new Spring(0, { stiffness: 180, damping: 14 }),
          rot: new Spring(0, { stiffness: 180, damping: 14 }),
        });
      }
      node.append(wordEl);
    });

    this.measure();
    document.fonts?.ready.then(() => this.measure());
    addEventListener('resize', () => this.measure());
    ticker.add((dt) => this.update(dt));
  }

  measure() {
    const rect = this.node.getBoundingClientRect();
    this.size = parseFloat(getComputedStyle(this.node).fontSize);
    for (const c of this.chars) {
      // offset* ignores transforms, so the springs don't skew the measurement.
      c.cx = rect.left + c.el.offsetLeft + c.el.offsetWidth / 2;
      c.cy = rect.top + c.el.offsetTop + c.el.offsetHeight / 2;
    }
  }

  update(dt) {
    const p = this.pointer;
    if (!p.fine || reducedMotion()) return;
    const radius = this.size * 0.85;
    for (const c of this.chars) {
      const dx = p.x - c.cx;
      const dy = p.y - c.cy;
      const influence = p.active ? Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius)) : 0;
      c.y.target = -influence * this.size * 0.14;
      c.rot.target = (-dx / radius) * influence * 7;
      const y = c.y.update(dt);
      const rot = c.rot.update(dt);
      if (Math.abs(y) < 0.01 && Math.abs(rot) < 0.01 && c.still) continue;
      c.still = Math.abs(y) < 0.01 && Math.abs(rot) < 0.01;
      c.el.style.transform = `translate3d(0,${r3(y)}px,0) rotate(${r3(rot)}deg)`;
    }
  }
}
