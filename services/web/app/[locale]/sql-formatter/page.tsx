import React from "react";

import { Metadata } from "next";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale, localeMapping } from "@/i18n.config";
import SqlFormatter from "./sql-formatter";
import siteConfig from "@/constants/site-config";

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
    title: dictionary.page.sqlFormatter.metaData.title,
    description: dictionary.page.sqlFormatter.metaData.description,
    openGraph: {
      title: dictionary.page.sqlFormatter.metaData.title,
      description: dictionary.page.sqlFormatter.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: siteConfig.url + "/" + locale + "/sql-formatter",
      languages: {
        "en-US": `${siteConfig.url}/${localeMapping.en}/sql-formatter`,
        "vi-VN": `${siteConfig.url}/${localeMapping.vi}/sql-formatter`,
      },
    },
    keywords: [
      "sql",
      "tools",
      "sql formatter",
      "sql beautifier",
      "sql minifier",
    ],
  };
}
interface SqlFormatterPageProps extends LocaleParams {}

async function SqlFormatterPage({ params: { locale } }: SqlFormatterPageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.sqlFormatter.title}
      dictionary={dictionary}
      locale={locale}
    >
      <SqlFormatter dictionary={dictionary} />
    </Layout>
  );
}

export default SqlFormatterPage;
