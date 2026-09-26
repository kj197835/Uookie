/**
 * Which pages go into each portfolio PDF, in order. One Section = one PDF page.
 * `sections` lists Section ids on that URL ('all' = every Section on the page).
 * The same list is used for KO (/…) and EN (/en/…).
 */
export type Part = { path: string; sections: string[] | 'all' };
export type PdfSpec = { name: string; parts: Part[] };

const featured = ['genai', 'interactive-view', 'digital-twin', 'map-view', 'apartment-research', 'b2b-iot-research'];
const earlier = ['mde', 'advanced-ux', 'engineer'];
const summaryCases = ['genai', 'interactive-view', 'digital-twin'];

const full: Part[] = [
  { path: '/', sections: ['hero', 'capabilities', 'career'] },
  ...featured.map((slug) => ({ path: `/work/${slug}/`, sections: 'all' as const })),
  ...earlier.map((slug) => ({ path: `/work/${slug}/`, sections: ['cover', 'impact'] })),
  { path: '/recognition/', sections: 'all' },
  { path: '/', sections: ['recognition'] }, // awards + contact as the closing page
];

const summary: Part[] = [
  { path: '/', sections: ['hero'] },
  ...summaryCases.map((slug) => ({ path: `/work/${slug}/`, sections: ['cover', 'design'] })),
  { path: '/', sections: ['recognition'] },
];

export const pdfs: { lang: 'ko' | 'en'; spec: PdfSpec }[] = (['ko', 'en'] as const).flatMap((lang) => {
  const suffix = lang.toUpperCase();
  return [
    { lang, spec: { name: `KyungJun_Lee_Portfolio_Full_${suffix}.pdf`, parts: full } },
    { lang, spec: { name: `KyungJun_Lee_Portfolio_Summary_${suffix}.pdf`, parts: summary } },
  ];
});

export const SITE = 'https://uookie.net';
export const MAX_MB = 20;
