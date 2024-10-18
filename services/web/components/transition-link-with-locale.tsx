"use client";
import { Locale } from "@/i18n.config";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { TransitionLink } from "./transition-link";

interface TransitionLinkWithLocaleProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function TransitionLinkWithLocale({
  href,
  className,
  children,
  ...props
}: TransitionLinkWithLocaleProps) {
  const pathName = usePathname();

  const currentLocale = useMemo(() => {
    const segments = pathName.split("/");
    const locale = segments[1] ?? ("en" as Locale);
    return locale;
  }, [pathName]);

  return (
    <TransitionLink
      href={`/${currentLocale}${href}`}
      className={className}
      {...props}
    >
      {children}
    </TransitionLink>
  );
}
