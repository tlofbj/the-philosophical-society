/**
 * Odometer-style digits: each column is a strip of glyphs that slides to the
 * one it should show. Used for the year and day on the dial.
 */
export class Roller {
  static GLYPHS = '0123456789–';

  constructor(node, length) {
    this.node = node;
    node.classList.add('roller');
    node.textContent = '';
    this.strips = Array.from({ length }, (_, i) => {
      const col = document.createElement('span');
      col.className = 'roller__col';
      const strip = document.createElement('span');
      strip.className = 'roller__strip';
      strip.style.setProperty('--c', i);
      strip.innerHTML = [...Roller.GLYPHS].map((g) => `<span>${g}</span>`).join('');
      col.append(strip);
      node.append(col);
      return strip;
    });
  }

  set(text) {
    [...text].forEach((ch, i) => {
      const k = Math.max(0, Roller.GLYPHS.indexOf(ch));
      if (this.strips[i]) this.strips[i].style.transform = `translateY(${-k * 1.1}em)`;
    });
  }
}
