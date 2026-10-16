import type { Lang } from '../../i18n';

export interface DreamDeepText {
  /** Why people tend to have this dream, from a modern point of view */
  why: string;
  /** What to do after the dream */
  tips: string[];
}

export type DreamDeep = Record<Lang, DreamDeepText>;

export const deepEntry = (koWhy: string, koTips: string[], viWhy: string, viTips: string[]): DreamDeep => ({
  ko: { why: koWhy, tips: koTips },
  vi: { why: viWhy, tips: viTips },
});
