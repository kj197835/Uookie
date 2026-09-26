/**
 * Figma export (Phase 8) — `npm run export-svg`
 * Opens every built case page (KO/EN) in light mode and saves each code-drawn diagram
 * ([data-diagram] svg[role=img], see CasePage.astro) as a standalone, Figma-ready SVG:
 * computed styles are baked in as attributes (CSS variables and color-mix resolved to real colors),
 * text stays <text> with font-family="Pretendard", classes and style attributes are removed.
 * Output: export/svg/<lang>/<case>--<key>.svg + export/svg/index.md
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { startPreview } from './preview-server';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'export/svg');
const cases = ['genai', 'interactive-view', 'digital-twin', 'map-view', 'apartment-research', 'b2b-iot-research', 'mde', 'advanced-ux', 'engineer'];

rmSync(outDir, { recursive: true, force: true });

const preview = await startPreview();
const browser = await chromium.launch();
const index: string[] = ['# Figma용 다이어그램 SVG', '', 'Figma 캔버스에 파일을 끌어다 놓으면 편집 가능한 벡터·텍스트 레이어가 됩니다. 글꼴은 Pretendard(로컬 설치 필요).', ''];
const counts: Record<string, number> = {};
try {
  const context = await browser.newContext({ colorScheme: 'light', viewport: { width: 1600, height: 1000 } });
  // tsx/esbuild wraps named functions in __name(); define it inside the page for page.evaluate
  await context.addInitScript('window.__name = (f) => f;');
  const page = await context.newPage();
  for (const lang of ['ko', 'en'] as const) {
    mkdirSync(resolve(outDir, lang), { recursive: true });
    index.push(`## ${lang.toUpperCase()}`, '');
    counts[lang] = 0;
    for (const slug of cases) {
      await page.goto(`${preview.url}${lang === 'en' ? '/en' : ''}/work/${slug}/`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const items = await page.evaluate(() => {
        // presentation properties worth baking in (browser default values are skipped)
        const PROPS = [
          'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'stroke-linecap',
          'stroke-linejoin', 'opacity', 'font-size', 'font-weight', 'letter-spacing', 'text-anchor', 'dominant-baseline',
        ];
        const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        document.body.appendChild(probe);
        const defaults: Record<string, Record<string, string>> = {};
        const defaultsFor = (tag: string) => {
          if (!defaults[tag]) {
            const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            probe.appendChild(el);
            const cs = getComputedStyle(el);
            defaults[tag] = Object.fromEntries(PROPS.map((p) => [p, cs.getPropertyValue(p)]));
          }
          return defaults[tag];
        };

        const out: { key: string; label: string; svg: string }[] = [];
        for (const holder of document.querySelectorAll<HTMLElement>('[data-diagram]')) {
          const svg = holder.querySelector<SVGSVGElement>('svg[role="img"]');
          if (!svg) continue;
          const clone = svg.cloneNode(true) as SVGSVGElement;
          const src = [svg, ...svg.querySelectorAll('*')];
          const dst = [clone, ...clone.querySelectorAll('*')];
          src.forEach((el, i) => {
            const target = dst[i] as Element;
            const cs = getComputedStyle(el);
            const def = defaultsFor(el.tagName.toLowerCase());
            const isText = el.tagName === 'text' || el.tagName === 'tspan';
            for (const p of PROPS) {
              const v = cs.getPropertyValue(p);
              const alwaysForText = isText && (p === 'font-size' || p === 'font-weight');
              // plain user-unit numbers ("1.5px" → "1.5") import most reliably into Figma
              if (v && (alwaysForText || v !== def[p]) && !(p === 'letter-spacing' && v === 'normal'))
                target.setAttribute(p, v.replace(/(\d)px\b/g, '$1'));
            }
            if (cs.display === 'none' || cs.visibility === 'hidden') target.setAttribute('display', 'none');
            for (const a of [...target.attributes]) {
              if (a.name === 'class' || a.name === 'style' || a.name.startsWith('data-astro') || a.name === 'font-family') target.removeAttribute(a.name);
            }
          });
          clone.querySelectorAll('text, tspan').forEach((t) => t.setAttribute('font-family', 'Pretendard'));
          clone.setAttribute('font-family', 'Pretendard');
          clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          const vb = clone.viewBox.baseVal;
          if (vb && vb.width) {
            clone.setAttribute('width', String(vb.width));
            clone.setAttribute('height', String(vb.height));
          }
          out.push({ key: holder.dataset.diagram!, label: svg.getAttribute('aria-label') ?? '', svg: clone.outerHTML });
        }
        probe.remove();
        return out;
      });
      for (const it of items) {
        const file = `${slug}--${it.key}.svg`;
        writeFileSync(resolve(outDir, lang, file), `<?xml version="1.0" encoding="UTF-8"?>\n${it.svg}\n`);
        index.push(`- \`${lang}/${file}\` — ${it.label.slice(0, 140)}${it.label.length > 140 ? '…' : ''}`);
        counts[lang]++;
      }
    }
    index.push('');
  }
  index.push(
    '## 참고',
    '',
    '- `genai--genai-hero.svg`는 samsung.com 공개 대시보드 사진 위에 올리는 AI 레이어만 포함합니다 (사진은 `public/images/genai/`).',
    '- Advanced UX 커버(내비게이션 바 5종, 사진 기반)와 폼팩터 매트릭스(HTML 표)는 SVG가 아니라 내보내지 않습니다.',
    '- 컨셉 이미지는 포트폴리오용 재구성이며 실제 화면이 아닙니다.',
    '',
  );
  writeFileSync(resolve(outDir, 'index.md'), index.join('\n'));
  writeFileSync(
    resolve(root, 'export/README.md'),
    [
      '# Figma로 가져오기',
      '',
      '이 폴더는 `npm run export-svg`(SVG)와 `npm run tokens`(토큰)가 만듭니다. 직접 고치지 말고 다시 생성하세요.',
      '',
      '## 1. 다이어그램 SVG — `svg/ko`, `svg/en`',
      '1. PC에 **Pretendard** 글꼴을 설치합니다 (없으면 Figma가 다른 글꼴로 바꿉니다).',
      '2. SVG 파일을 Figma 캔버스에 끌어다 놓습니다. 도형·선·글자가 각각 편집 가능한 레이어가 됩니다.',
      '3. 파일 목록과 설명은 `svg/index.md`.',
      '',
      '## 2. 디자인 토큰 — `tokens/light.tokens.json`, `tokens/dark.tokens.json`',
      '- W3C DTCG 형식 (색·글자 크기·간격·굵기·모서리 등). 라이트/다크 모드별로 값이 풀려 있습니다.',
      '- **Tokens Studio for Figma** 플러그인: Tools → Load from file로 두 파일을 각각 `light`, `dark` 세트로 불러온 뒤, Styles & Variables → Export to Figma로 Variables를 만듭니다.',
      '- `tokens.json`은 원본 전체(다크 값은 `$extensions.mode.dark`)입니다.',
      '',
    ].join('\n'),
  );
} finally {
  await browser.close();
  preview.stop();
}
console.log(`SVG export: ko ${counts.ko}, en ${counts.en} → export/svg/`);
if (counts.ko !== counts.en || !counts.ko) process.exit(1);
