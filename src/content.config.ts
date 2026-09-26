import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const titled = z.object({ title: z.string(), body: z.string() });

/** Public photo in public/images/<case>/ — always credited with a source link. */
const photo = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  source: z.object({ label: z.string(), url: z.url() }),
  /** Which key-design point(s) this photo illustrates, shown as its badge (e.g. "1·2"). */
  marker: z.string().optional(),
});

const stepFlow = z.object({
  steps: z.array(
    z.object({ src: z.string(), alt: z.string(), title: z.string(), sub: z.string().optional(), auto: z.boolean().optional() }),
  ),
  autoLabel: z.string().optional(),
  caption: z.string().optional(),
  source: z.object({ label: z.string(), url: z.url() }),
});

const designSection = z.object({
  /** Which part of the case this page covers, shown after "핵심 설계 ·" (e.g. "GenAI 챗봇"). */
  label: z.string().optional(),
  /** split = visual left + points right (default) · wide = full-width visual, points in a row below. */
  layout: z.enum(['split', 'wide']).default('split'),
  heading: z.string(),
  points: z.array(titled),
  visual: z.object({
    id: z.string(),
    description: z.string(),
    /** In-code concept visual (see CasePage `diagrams`); replaces the placeholder when present. */
    diagram: z.string().optional(),
    /** Public photo, or several (first large, rest in a row below); replaces the placeholder. */
    image: z.union([photo, z.array(photo).min(1)]).optional(),
    /** Numbered screenshot flow (steps in one row); `auto` steps get the autoLabel tag. */
    flow: z
      .object({
        steps: z.array(
          z.object({ src: z.string(), alt: z.string(), title: z.string(), sub: z.string().optional(), auto: z.boolean().optional() }),
        ),
        autoLabel: z.string().optional(),
        caption: z.string().optional(),
        source: z.object({ label: z.string(), url: z.url() }),
      })
      .optional(),
    /** Optional in-code journey diagram; replaces the placeholder when present. */
    journey: z
      .array(z.object({ title: z.string(), steps: z.array(z.object({ label: z.string(), sub: z.string().optional() })) }))
      .optional(),
  }),
});
const link = z.object({ label: z.string(), url: z.url() });

/**
 * Case studies. One file per case per language: cases/<lang>/<slug>.md → entry id "<lang>/<slug>".
 * Almost everything lives in frontmatter so every case renders the same 16:9 section structure
 * (cover → background → approach → design → impact).
 */
const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    order: z.number(),
    group: z.enum(['featured', 'earlier']),
    theme: z.enum(['AI UX', 'Spatial IoT', 'UX Research', 'Mobile UX', 'Engineering']),
    title: z.string(),
    subtitle: z.string().optional(),
    summary: z.string(),
    period: z.string(),
    role: z.string(),
    awards: z.array(z.object({ year: z.number(), name: z.string(), url: z.url().optional() })).default([]),
    background: z.object({
      problem: z.string(),
      context: z.array(titled),
    }),
    approach: z.object({
      heading: z.string(),
      /** An item may carry a small in-code illustration (key in CasePage `diagrams`). */
      items: z.array(titled.extend({ diagram: z.string().optional() })),
    }),
    /** One or more key-design sections (each = one 16:9 page). */
    design: z.union([designSection, z.array(designSection)]).optional(),
    /** In-code concept visual for the cover (see CasePage `diagrams`). */
    coverVisual: z.string().optional(),
    /** Public photo for the cover (used when there is no coverVisual). */
    coverImage: photo.optional(),
    /** Ongoing / confidential work → status chips on the card and cover, lock chip on visuals. */
    status: z.object({ inProgress: z.boolean().default(false), confidential: z.boolean().default(false) }).optional(),
    impact: z.object({
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      results: z.array(z.string()),
      /** Evidence photo shown beside the results (e.g. an exhibition booth). */
      photo: photo.optional(),
      /** Numbered frames under the results (e.g. stills from an exhibition demo video). */
      flow: stepFlow.optional(),
    }),
    links: z.array(link).default([]),
    /** Honest framing note shown on the cover (e.g. hand-over, in-development). */
    note: z.string().optional(),
  }),
});

export const collections = { cases };
