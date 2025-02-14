import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "@/middlewares/auth-middleware";
import { withI18nMiddleware } from "@/middlewares/intl-middleware";

export default chain([withAuthMiddleware, withI18nMiddleware]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
