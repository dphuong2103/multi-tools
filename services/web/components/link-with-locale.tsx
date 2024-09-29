"use client";
import { Locale } from "@/i18n.config";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface LinkWithLocaleProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function LinkWithLocale({
  href,
  className,
  children,
}: LinkWithLocaleProps) {
  const pathName = usePathname();

  const currentLocale = useMemo(() => {
    const segments = pathName.split("/");
    const locale = segments[1] ?? ("en" as Locale);
    return locale;
  }, [pathName]);

  return (
    <Link href={`/${currentLocale}${href}`} className={className}>
      {children}
    </Link>
  );
}
