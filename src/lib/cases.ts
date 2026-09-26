import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/utils';
import chaptersKo from '@/content/chapters.ko.json';

export type Case = CollectionEntry<'cases'>;

/** 'ko/digital-twin' → 'digital-twin' */
export function caseSlug(entry: Case): string {
  return entry.id.split('/').pop()!;
}

/** All cases of one language, in portfolio order. */
export async function getCases(lang: Lang): Promise<Case[]> {
  const entries = await getCollection('cases', (entry) => entry.id.startsWith(`${lang}/`));
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** '03' style case number. */
export function caseNumber(entry: Case): string {
  return String(entry.data.order).padStart(2, '0');
}

type ChapterData = (typeof chaptersKo)[number];
export type Chapter = Omit<ChapterData, 'cases'> & { cases: Case[] };

// EN chapters arrive in Phase 6; until then both languages read the KO file.
const chapterSource: Record<Lang, ChapterData[]> = { ko: chaptersKo, en: chaptersKo };

/**
 * Career chapters, newest first, with their case entries resolved.
 * Fails the build if a case is missing from the chapters or listed twice.
 */
export async function getChapters(lang: Lang): Promise<Chapter[]> {
  const cases = await getCases(lang);
  const bySlug = new Map(cases.map((c) => [caseSlug(c), c]));
  const seen = new Set<string>();

  const chapters = chapterSource[lang].map((chapter) => ({
    ...chapter,
    cases: chapter.cases.map((slug) => {
      const entry = bySlug.get(slug);
      if (!entry) throw new Error(`chapters.${lang}.json: unknown case "${slug}" in chapter "${chapter.id}"`);
      if (seen.has(slug)) throw new Error(`chapters.${lang}.json: case "${slug}" is listed in more than one chapter`);
      seen.add(slug);
      return entry;
    }),
  }));

  const missing = [...bySlug.keys()].filter((slug) => !seen.has(slug));
  if (missing.length) throw new Error(`chapters.${lang}.json: cases without a chapter: ${missing.join(', ')}`);
  return chapters;
}

/** The chapter a case belongs to. */
export function chapterOf(chapters: Chapter[], entry: Case): Chapter {
  return chapters.find((ch) => ch.cases.some((c) => c.id === entry.id))!;
}

/** Anchor id of a chapter on the Work page. */
export function chapterAnchor(chapter: Pick<Chapter, 'no'>): string {
  return `ch-${chapter.no}`;
}
