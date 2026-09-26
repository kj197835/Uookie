import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const titled = z.object({ title: z.string(), body: z.string() });
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
      items: z.array(titled),
    }),
    design: z
      .object({
        heading: z.string(),
        points: z.array(titled),
        /** Placeholder until a diagram / public image is added. */
        visual: z.object({
          id: z.string(),
          description: z.string(),
          /** Optional in-code journey diagram; replaces the placeholder when present. */
          journey: z
            .array(z.object({ title: z.string(), steps: z.array(z.object({ label: z.string(), sub: z.string().optional() })) }))
            .optional(),
        }),
      })
      .optional(),
    impact: z.object({
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      results: z.array(z.string()),
    }),
    links: z.array(link).default([]),
    /** Honest framing note shown on the cover (e.g. hand-over, in-development). */
    note: z.string().optional(),
  }),
});

export const collections = { cases };
