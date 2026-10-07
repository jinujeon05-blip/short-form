// Dream interpretation entries. All wording is original; interpretations follow common folk readings.
export type DreamCategory = 'animal' | 'people' | 'nature' | 'situation';
export type DreamTone = 'good' | 'bad' | 'mixed';

export interface DreamText {
  /** Dream name as people search it, e.g. 돼지꿈 / mơ thấy lợn */
  name: string;
  /** Extra search words */
  keywords: string[];
  summary: string;
  /** How Koreans traditionally read it */
  korea: string;
  /** How Vietnamese traditionally read it */
  vietnam: string;
  /** [situation, meaning] */
  cases: [string, string][];
}

export interface Dream {
  slug: string;
  category: DreamCategory;
  tone: DreamTone;
  emoji: string;
  ko: DreamText;
  vi: DreamText;
}
