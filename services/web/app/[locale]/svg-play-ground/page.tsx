import React from "react";

import { Metadata } from "next";
import SvgEditor from "./svg-editor";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale } from "@/i18n.config";

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
    title: dictionary.page.svgPlayGround.metaData.title,
    description: dictionary.page.svgPlayGround.metaData.description,
    openGraph: {
      title: dictionary.page.svgPlayGround.metaData.title,
      description: dictionary.page.svgPlayGround.metaData.description,
      locale: locale,
      type: "website",
    }
  };
}
interface SvgPlayGroundPageProps extends LocaleParams { }

async function SvgPlayGroundPage({
  params: { locale },
}: SvgPlayGroundPageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout title="SVG Playground" dictionary={dictionary} locale={locale}>
      <SvgEditor dictionary={dictionary} />
    </Layout>
  );
}

export default SvgPlayGroundPage;
