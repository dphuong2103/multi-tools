"use client";

import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { DictionaryProps } from "@/types/data-types";
import { Button } from "./button";
import vietNamIcon from "@/assets/images/nav-bar/language-vietnam-icon.svg";
import englishIcon from "@/assets/images/nav-bar/language-english-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { useMemo } from "react";

interface LocaleSwitcherProps extends DictionaryProps {}

export default function LocaleSwitcher({ dictionary }: LocaleSwitcherProps) {
  const pathName = usePathname();
  const items = useMemo<
    {
      iconSrc: string;
      label: string;
      locale: Locale;
      alt: string;
    }[]
  >(() => {
    return [
      {
        label: dictionary.navBar.localeSwitcher.vietnamese,
        iconSrc: vietNamIcon,
        locale: "vn",
        alt: "Vietnam flag",
      },
      {
        label: dictionary.navBar.localeSwitcher.english,
        iconSrc: englishIcon,
        locale: "en",
        alt: "United Kingdom flag",
      },
    ];
  }, [
    dictionary.navBar.localeSwitcher.vietnamese,
    dictionary.navBar.localeSwitcher.english,
  ]);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const currentLocale = useMemo(() => {
    const segments = pathName.split("/");
    const locale = segments[1] as Locale;
    return items.find((item) => item.locale === locale);
  }, [pathName, items]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {!!currentLocale ? (
            <Image
              src={currentLocale.iconSrc}
              width={30}
              height={30}
              alt={currentLocale.alt}
            />
          ) : (
            "..."
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {items.map((item) => (
          <DropdownMenuItem asChild key={item.locale}>
            <Link
              className="flex gap-2 items-center"
              href={redirectedPathName(item.locale)}
            >
              {
                <Image
                  src={item.iconSrc}
                  width={24}
                  height={24}
                  alt={item.alt}
                />
              }
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
