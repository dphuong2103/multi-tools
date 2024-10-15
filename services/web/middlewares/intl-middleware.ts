import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { CustomMiddleware } from "./chain";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  console.log("languages: ", languages);
  console.log("locales: ", locales);
  console.log("i18n.defaultLocale: ", locales, i18n.defaultLocale);
  console.log("request.cookies.get(NEXT_LOCALE)", request.cookies.get("NEXT_LOCALE"));
  let locale: string;
  try {
    locale = !!request.cookies.get("NEXT_LOCALE")?.value
      ? request.cookies.get("NEXT_LOCALE")!.value
      : (matchLocale(languages, locales, i18n.defaultLocale) ??
        i18n.defaultLocale);
  } catch {
    return i18n.defaultLocale;
  }
  return locale;
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // do i18n stuff
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      const response = NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url,
        ),
      );
      response.cookies.set({
        name: "NEXT_LOCALE",
        value: locale,
        httpOnly: true,
      });
      return response;
    }

    const locale = pathname.split("/")[1] as string;

    if (request.cookies.get("NEXT_LOCALE")?.value !== locale) {
      response.cookies.set("NEXT_LOCALE", locale);
    }

    return middleware(request, event, response);
  };
}
