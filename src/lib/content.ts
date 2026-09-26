import type { Lang } from '@/i18n/utils';
import profileKo from '@/content/profile.ko.json';
import profileEn from '@/content/profile.en.json';
import careerKo from '@/content/career.ko.json';
import careerEn from '@/content/career.en.json';
import visualsKo from '@/content/visuals.ko.json';
import visualsEn from '@/content/visuals.en.json';

/** Shared per-language content. KO is the source of truth; EN mirrors its structure. */
export const getProfile = (lang: Lang) => (lang === 'en' ? profileEn : profileKo);
export const getCareer = (lang: Lang) => (lang === 'en' ? careerEn : careerKo);
export const getVisuals = (lang: Lang): typeof visualsKo => (lang === 'en' ? visualsEn : visualsKo);
