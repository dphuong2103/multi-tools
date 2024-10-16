import "server-only";
import type { Locale } from "@/i18n.config";
import en from "@/dictionaries/en.json";
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type Messages = typeof en;
type Paths<Schema, Path extends string = ""> = Schema extends string
  ? Path
  : Schema extends object
    ? {
        [K in keyof Schema & string]: Paths<
          Schema[K],
          `${Path}${Path extends "" ? "" : "."}${K}`
        >;
      }[keyof Schema & string]
    : never;

export type MessageId = Paths<Messages>;

export function interpolateTranslations(
  value: string,
  data: Record<string, string>,
) {
  // Match all placeholders in the string like {hello}, {name}, etc.
  const placeholders = value.match(/\{(.*?)\}/g) || [];

  return placeholders.reduce((acc, placeholder) => {
    // Extract the key inside the curly braces
    const key = placeholder.slice(1, -1);

    // Check if the key exists in the data object
    if (!data.hasOwnProperty(key)) {
      console.warn(
        `Missing key '${key}' in the data object for placeholder ${placeholder}`,
      );
      return acc; // Optionally leave the placeholder unchanged or handle it
    }

    // Replace all occurrences of the placeholder with the corresponding value
    const regex = new RegExp(`\\{${key}\\}`, "g");
    return acc.replace(regex, data[key]);
  }, value);
}
