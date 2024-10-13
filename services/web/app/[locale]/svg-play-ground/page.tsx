import React from "react";

import { Metadata } from "next";
import SvgEditor from "./svg-editor";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale, localeMapping } from "@/i18n.config";
import siteConfigs from "@/constants/site-configs";

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
    },
    alternates: {
      canonical: siteConfigs.url + "/" + locale + "/svg-play-ground",
      languages:{
        'en-US':`${siteConfigs.url}/${localeMapping.en}/svg-play-ground`,
        'vi-VN':`${siteConfigs.url}/${localeMapping.vi}/svg-play-ground`,
      }
    },
    keywords:["svg","tools","svg editor","svg playground","svg formatter"],
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
