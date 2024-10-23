import React from "react";
import NavBar from "@/components/ui/nav-bar";
import { DictionaryProps, LocaleParams, LocaleProps } from "@/types/data-types";
import Footer from "./footer";
import { cn } from "@/lib/utils";

interface LayoutProps extends DictionaryProps, LocaleProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

function Layout({
  children,
  title,
  dictionary,
  locale,
  className,
}: LayoutProps) {
  return (
    <div
      className={cn(
        " h-screen flex flex-col max-w-screen min-w-screen ",
        className,
      )}
    >
      <NavBar title={title} dictionary={dictionary} locale={locale} />
      <div className="container flex justify-center h-full">
        <div className="w-full max-w-7xlxl h-full">
          <div className="flex flex-col h-full">
            <main className="flex justify-center items-start p-1 md:p-6 md:pb-0 w-full flex-1 pb-2">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
