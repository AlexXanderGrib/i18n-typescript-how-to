export const locales = ["en", "ru"] as const;
export const baseLocale = locales[0];
export type Locales = typeof locales[number];

export function isLocale(locale: string): locale is Locales {
  return locales.includes(locale as Locales);
}

export function checkLocale(locale: string): Locales {
  if (isLocale(locale)) {
    return locale;
  }

  throw new Error(`Invalid locale: "${locale}"`);
}
