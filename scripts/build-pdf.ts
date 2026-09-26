/**
 * Portfolio PDFs (Phase 7) — `npm run pdf`
 * Prints the built site with Chromium (print.css: one Section = one 1920×1080 page), keeps only the
 * Sections listed in scripts/pdf-config.ts, and merges them into public/pdf/*.pdf (KO/EN × Full/Summary).
 */
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium, type Page } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { MAX_MB, SITE, pdfs, type Part } from './pdf-config';
import { startPreview } from './preview-server';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'public/pdf');
mkdirSync(outDir, { recursive: true });

/** Prepare one page for print: keep the chosen Sections, load every image, make links absolute. */
async function prepare(page: Page, part: Part, lang: 'ko' | 'en') {
  return page.evaluate(
    async ({ sections, site, lang }) => {
      const all = [...document.querySelectorAll<HTMLElement>('section.section')];
      const keep = sections === 'all' ? all : all.filter((s) => sections.includes(s.id));
      const missing = sections === 'all' ? [] : sections.filter((id) => !keep.some((s) => s.id === id));
      for (const s of all) if (!keep.includes(s)) s.style.setProperty('display', 'none', 'important');
      // a Section marked pdf="none" (e.g. screen-only lists) must still print when explicitly chosen
      for (const s of keep) s.removeAttribute('data-pdf');

      for (const img of document.querySelectorAll('img')) img.loading = 'eager';
      await Promise.all(
        [...document.images].map((img) => (img.complete ? img.decode().catch(() => {}) : new Promise((r) => { img.onload = img.onerror = r; }))),
      );
      await document.fonts.ready;

      for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')) a.href = site + a.getAttribute('href');

      // overflow check: every printed page must fit 1080px
      const overflow = keep
        .map((s) => s.querySelector<HTMLElement>('.section__page'))
        .filter((p): p is HTMLElement => !!p && p.scrollHeight > p.clientHeight + 1)
        .map((p) => `${p.closest('section')?.id}: ${p.scrollHeight}px`);
      return { count: keep.length, missing, overflow, lang };
    },
    { sections: part.sections, site: SITE, lang },
  );
}

const preview = await startPreview();
const browser = await chromium.launch();
const problems: string[] = [];
try {
  const context = await browser.newContext({ colorScheme: 'light', viewport: { width: 1920, height: 1080 } });
  // tsx/esbuild wraps named functions in __name(); define it inside the page for page.evaluate
  await context.addInitScript('window.__name = (f) => f;');
  const page = await context.newPage();
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });

  for (const { lang, spec } of pdfs) {
    const merged = await PDFDocument.create();
    let expected = 0;
    for (const part of spec.parts) {
      const path = (lang === 'en' ? '/en' : '') + part.path;
      await page.goto(preview.url + path, { waitUntil: 'networkidle' });
      const r = await prepare(page, part, lang);
      if (r.missing.length) problems.push(`${spec.name} ${path}: missing sections ${r.missing.join(', ')}`);
      if (r.overflow.length) problems.push(`${spec.name} ${path}: overflow ${r.overflow.join(', ')}`);
      expected += r.count;
      const bytes = await page.pdf({ preferCSSPageSize: true, printBackground: true });
      const doc = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }
    merged.setTitle(lang === 'ko' ? '이경준 — UX 포트폴리오' : 'KyungJun Lee — UX Portfolio');
    merged.setAuthor('KyungJun Lee');
    merged.setSubject('Principal UX Designer · Designing with AI & for AI');
    merged.setLanguage(lang === 'ko' ? 'ko-KR' : 'en-US');
    merged.setCreator('uookie.net');

    const file = resolve(outDir, spec.name);
    writeFileSync(file, await merged.save());
    const mb = statSync(file).size / 1024 / 1024;
    const n = merged.getPageCount();
    console.log(`${spec.name}: ${n} pages, ${mb.toFixed(1)} MB`);
    if (n !== expected) problems.push(`${spec.name}: ${n} pages but ${expected} sections selected (blank/stray pages?)`);
    if (mb > MAX_MB) problems.push(`${spec.name}: ${mb.toFixed(1)} MB > ${MAX_MB} MB`);
  }
} finally {
  await browser.close();
  preview.stop();
}

if (problems.length) {
  console.error('\nProblems:\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
