import type { Locale } from '../i18n/translations';

const MONTHS: Record<Locale, Record<string, number>> = {
  'it-it': {
    gennaio: 1, febbraio: 2, marzo: 3, aprile: 4, maggio: 5, giugno: 6,
    luglio: 7, agosto: 8, settembre: 9, ottobre: 10, novembre: 11, dicembre: 12,
  },
  'en-us': {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  },
  'de-de': {
    januar: 1, februar: 2, märz: 3, marz: 3, april: 4, mai: 5, juni: 6,
    juli: 7, august: 8, september: 9, oktober: 10, november: 11, dezember: 12,
  },
  'es-es': {
    enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
    julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  },
  'fr-fr': {
    janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
    juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12,
  },
};

const PATTERNS: Record<Locale, RegExp> = {
  'it-it': /^(\d{1,2})\s+([\p{L}]+)\s+(\d{4})$/u,
  'fr-fr': /^(\d{1,2})\s+([\p{L}]+)\s+(\d{4})$/u,
  'en-us': /^([\p{L}]+)\s+(\d{1,2}),?\s+(\d{4})$/u,
  'de-de': /^(\d{1,2})\.?\s+([\p{L}]+)\s+(\d{4})$/u,
  'es-es': /^(\d{1,2})\s+de\s+([\p{L}]+)\s+de\s+(\d{4})$/u,
};

export function parseLocalizedDate(date: string, lang: Locale): string | null {
  const normalized = date.trim().toLowerCase();
  const pattern = PATTERNS[lang];
  if (!pattern) return null;
  const match = normalized.match(pattern);
  if (!match) return null;

  let dayStr: string;
  let monthName: string;
  let yearStr: string;

  if (lang === 'en-us') {
    [, monthName, dayStr, yearStr] = match;
  } else {
    [, dayStr, monthName, yearStr] = match;
  }

  const month = MONTHS[lang]?.[monthName];
  if (!month) return null;
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  if (day < 1 || day > 31) return null;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
