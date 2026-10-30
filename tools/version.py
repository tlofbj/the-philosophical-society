#!/usr/bin/env python3
"""Stamp a fresh version on every stylesheet and script that index.html loads.

GitHub Pages lets browsers cache each file for 10 minutes, so after a deploy a
visitor can get the new page with old scripts. Run this before every push:

    python3 tools/version.py

Stylesheets and js/main.js get ?v=<stamp> directly. Every other module is
loaded through `import` statements, so an import map in index.html points
each module path at its versioned URL; the JavaScript itself stays unchanged.
"""

import pathlib
import re
import time

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / 'index.html'


def main():
    stamp = time.strftime('%Y%m%d%H%M%S')
    html = INDEX.read_text()

    html = re.sub(r'href="(css/[\w-]+\.css)(\?v=\w+)?"', rf'href="\1?v={stamp}"', html)
    html = re.sub(r'src="js/main\.js(\?v=\w+)?"', f'src="js/main.js?v={stamp}"', html)

    modules = sorted(p.relative_to(ROOT).as_posix() for p in (ROOT / 'js').rglob('*.js'))
    entries = ',\n'.join(f'      "./{m}": "./{m}?v={stamp}"' for m in modules if m != 'js/main.js')
    importmap = f'<script type="importmap">\n  {{\n    "imports": {{\n{entries}\n    }}\n  }}\n  </script>'

    if '<script type="importmap">' in html:
        html = re.sub(r'<script type="importmap">.*?</script>', lambda _: importmap, html, flags=re.S)
    else:
        # The import map must come before the first module script.
        html = html.replace('<script type="module"', f'{importmap}\n  <script type="module"', 1)

    INDEX.write_text(html)
    print(f'Stamped v={stamp} on {len(modules)} scripts and the stylesheets.')


if __name__ == '__main__':
    main()
