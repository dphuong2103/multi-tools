import React from "react";

import { Metadata, ResolvingMetadata } from "next";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale } from "@/i18n.config";
import SqlFormatter from "./sql-formatter";

type MetadataProps = {
  params: {
    locale: Locale;
  };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = params.locale;
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.page.sqlFormatter.metaData.title,
    description: dictionary.page.sqlFormatter.metaData.description,
  };
}
interface SqlFormatterPageProps extends LocaleParams { }

async function SqlFormatterPage({
  params: { locale },
}: SqlFormatterPageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout title={dictionary.page.sqlFormatter.title} dictionary={dictionary} locale={locale}>
      <SqlFormatter dictionary={dictionary} />
    </Layout>
  );
}

export default SqlFormatterPage;
