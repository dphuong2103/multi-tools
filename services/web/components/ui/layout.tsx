import React from "react";
import NavBar from "@/components/ui/nav-bar";
import { DictionaryProps, LocaleParams, LocaleProps } from "@/types/data-types";

interface LayoutProps extends DictionaryProps, LocaleProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title, dictionary, locale }: LayoutProps) {
  return (
    <div className="h-full flex flex-col max-w-screen min-w-screen">
      <NavBar title={title} dictionary={dictionary} locale={locale} />
      <div className="flex justify-center h-full">
        <div className="w-full max-w-7xlxl h-full">
          <main className="flex justify-center items-start p-1 md:p-6 w-full h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
