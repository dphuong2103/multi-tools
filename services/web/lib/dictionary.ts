// import 'server-only'
import type { Locale } from "@/i18n.config";
import en from "@/dictionaries/en.json";
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  vi: () => import("@/dictionaries/vn.json").then((module) => module.default),
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
