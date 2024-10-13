import React from "react";
import NavBarLinks from "./nav-bar-links";
import { ThemeToggle } from "./theme-toggle";
import MobileNavBar from "./mobile-nav-bar";
import multiToolIcon from "@/assets/images/multi-tools-icon.svg";
import Image from "next/image";
import { DictionaryProps, LocaleProps } from "@/types/data-types";
import LocaleSwitcher from "./locale-switcher";
import { LinkWithLocale } from "../link-with-locale";
interface NavBarProps extends DictionaryProps, LocaleProps {
  title: string;
}
function NavBar({ title, dictionary, locale }: NavBarProps) {
  return (
    <nav>
      <div className="w-full pl-6 p-2 md:p-4 flex items-center justify-between border bottom-1 ">
        <LinkWithLocale
          href="/"
          className="text-2xl font-bold flex gap-2 items-center"
        >
          <Image src={multiToolIcon} alt="Multi Tools" width={36} />
          <h1 className="hidden md:inline-block">{title}</h1>
          <span className="sr-only">Multi tools logo</span>
        </LinkWithLocale>
        <h1 className="text-xl font-bold md:hidden">{title}</h1>
        <MobileNavBar locale={locale} dictionary={dictionary} />
        <div className="gap-5 hidden md:flex">
          <NavBarLinks dictionary={dictionary} />
          <ThemeToggle />
          <LocaleSwitcher dictionary={dictionary} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
