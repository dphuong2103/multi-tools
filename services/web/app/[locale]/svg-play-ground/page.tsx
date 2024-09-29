import React from "react";

import { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = params.locale;
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.page.svgPlayGround.metaData.title,
    description: dictionary.page.svgPlayGround.metaData.description,
  };
}
interface SvgPlayGroundPageProps extends LocaleParams {}

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
