export const locales = [
  "en",
  "fr",
  "de",
  "es",
  "it",
  "nl",
  "ru",
  "pl",
  "ptbr",
  "fa",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
  nl: "Nederlands",
  ru: "Русский",
  pl: "Polski",
  ptbr: "Português",
  fa: "فارسی",
};

const RTL_LOCALES: readonly Locale[] = ["fa"];

export type TextDirection = "ltr" | "rtl";

export const getLocaleDirection = (locale: Locale): TextDirection =>
  RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

export const getHtmlLang = (locale: Locale): string =>
  locale === "ptbr" ? "pt-BR" : locale;
