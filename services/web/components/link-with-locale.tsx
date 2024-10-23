"use client";
import { i18n } from "@/i18n.config";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, useMemo } from "react";

interface LinkWithLocaleProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const LinkWithLocale = forwardRef<any | undefined, LinkWithLocaleProps>(
  ({ href, className, children, ...props }, ref) => {
    const pathName = usePathname();

    const currentLocale = useMemo(() => {
      const segments = pathName.split("/");
      const locale = i18n.locales.includes(segments[1]) ? segments[1] : "en";
      return locale;
    }, [pathName]);

    return (
      <Link
        href={`/${currentLocale}${href}`}
        className={className}
        {...props}
        ref={ref}
      >
        {children}
      </Link>
    );
  },
);

LinkWithLocale.displayName = "LinkWithLocale";

export default LinkWithLocale;
