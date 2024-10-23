import siteConfig, { SiteConfig } from "@/constants/site-config";
import { Locale } from "@/i18n.config";

const pages = [
  "home",
  "hex",
  "base64",
  "svgPlayGround",
  "sqlFormatter",
  "codeEditor",
  "contactUs",
  "aboutUs",
] as const;
type Page = (typeof pages)[number];

const routes = [
  "",
  "/",
  "/hex",
  "/base64",
  "/svg-play-ground",
  "/sql-formatter",
  "/code-editor",
  "/contact-us",
  "/about-us",
] as const;

export const pageToRouteMapping: Record<Page, Route> = {
  home: "",
  hex: "/hex",
  base64: "/base64",
  svgPlayGround: "/svg-play-ground",
  sqlFormatter: "/sql-formatter",
  codeEditor: "/code-editor",
  contactUs: "/contact-us",
  aboutUs: "/about-us",
} as const;

export type Route = (typeof routes)[number];
export type FullPageRoute = `${SiteConfig["url"]}${Route}`;

export type FullPageRouteWithLocale = `${SiteConfig["url"]}/${Locale}/${Route}`;

export function getFullPageRouteWithDomain(page: Page, locale?: Locale) {
  const localePath = locale ? `/${locale}` : "";
  return `${siteConfig.url}${localePath}${pageToRouteMapping[page]}`;
}
