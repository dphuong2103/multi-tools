import React from "react";

import { Metadata } from "next";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale, localeMapping } from "@/i18n.config";
import CodeEditor from "./code-editor";
import siteConfig from "@/constants/site-config";
import { getFullPageRouteWithDomain } from "@/models/routes";

type MetadataProps = {
  params: {
    locale: Locale;
  };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const locale = params.locale;
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.page.codeEditor.metaData.title,
    description: dictionary.page.codeEditor.metaData.description,
    openGraph: {
      title: dictionary.page.codeEditor.metaData.title,
      description: dictionary.page.codeEditor.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: getFullPageRouteWithDomain("codeEditor"),
      languages: {
        "en-US": getFullPageRouteWithDomain("codeEditor", "en"),
        "vi-VN": getFullPageRouteWithDomain("codeEditor", "vi"),
      },
    },
    keywords: [
      "code editor",
      "tools",
      "code formatter",
      "code beautifier",
      "code minifier",
    ],
  };
}
interface PageProps extends LocaleParams {}

async function Page({ params: { locale } }: PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.codeEditor.title}
      dictionary={dictionary}
      locale={locale}
    >
      <CodeEditor dictionary={dictionary} />
    </Layout>
  );
}

export default Page;
