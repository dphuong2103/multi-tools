export const i18n = {
  defaultLocale: "en",
  locales: ["en", "vi"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
export const localeMapping: Record<Locale, string> = {
  en: "en",
  vi: "vi",
};
