import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { i18n } from "@/i18n.config";
import { CustomMiddleware } from "./chain";

// function getLocale(request: NextRequest): string {
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
//   console.log("languages:", languages);
//   let locale: string;
//   try {
//     locale = !!request.cookies.get("NEXT_LOCALE")?.value
//       ? request.cookies.get("NEXT_LOCALE")!.value
//       : (matchLocale(languages, i18n.locales, i18n.defaultLocale) ??
//         i18n.defaultLocale);
//   } catch {
//     return i18n.defaultLocale;
//   }
//   return locale;
// }

function parseAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return i18n.defaultLocale;
  // Split the header string into individual language segments
  const languages = acceptLanguage.split(",").map((lang) => {
    const [code, q] = lang.split(";q=");
    return { code: code.trim(), q: q ? parseFloat(q) : 1.0 };
  });

  // Filter for languages that start with "en" or "vi"
  const filteredLanguages = languages.filter(
    (lang) => lang.code.startsWith("en") || lang.code.startsWith("vi"),
  );

  // If both "en" and "vi" are in the list, pick the one with the higher q value
  const enLanguage = filteredLanguages.find((lang) =>
    lang.code.startsWith("en"),
  );
  const viLanguage = filteredLanguages.find((lang) =>
    lang.code.startsWith("vi"),
  );

  if (enLanguage && viLanguage) {
    return enLanguage.q >= viLanguage.q ? "en" : "vi";
  }

  // If "en" is not in the list, take "vi"
  if (!enLanguage && viLanguage) {
    return "vi";
  }

  // If "vi" is not in the list, take "en"
  if (!viLanguage && enLanguage) {
    return "en";
  }

  // If both are not in the list, default to "en"
  return i18n.defaultLocale;
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
      // const locale = getLocale(request);
      const locale = parseAcceptLanguage(
        request.headers.get("accept-language"),
      );
      const newUrl = new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      );
      // const userAgent = request.headers.get("user-agent") || "";
      // const isGoogleBot = userAgent.toLowerCase().includes("googlebot");
      // console.log("userAgent:", userAgent);
      // if (isGoogleBot) {
      //   console.log("Googlebot encountered a redirect", {
      //     originalUrl: request.url,
      //     redirectUrl: newUrl.toString(),
      //   });
      // }
      const response = NextResponse.redirect(newUrl);
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
