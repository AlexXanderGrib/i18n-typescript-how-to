import { Locales, locales } from "./locales";
import { Translation } from "./translation";

const cache: Partial<Record<Locales, Translation>> = {};

export async function loadLocale(locale: Locales): Promise<Translation> {
  const loaded = cache[locale];

  if (loaded) {
    return loaded;
  }

  const translationModule: Partial<Record<Locales, Translation>> = await import(
    `./locales/${locale}/index`
  );

  const translation = translationModule[locale];

  if (!translation) {
    throw new Error(
      `Unable to load translation: Missing "${locale}" key on loaded module`
    );
  }

  return (cache[locale] = translation);
}

export async function loadAllLocales(): Promise<Record<Locales, Translation>> {
  const translations = {} as Record<Locales, Translation>;

  await Promise.all(
    locales.map(async (locale) => {
      const translation = await loadLocale(locale);
      translations[locale] = translation;
    })
  );

  return translations;
}
