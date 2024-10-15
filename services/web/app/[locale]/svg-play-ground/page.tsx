import React from "react";

import { Metadata } from "next";
import SvgEditor from "./svg-editor";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale } from "@/i18n.config";
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
    title: dictionary.page.svgPlayGround.metaData.title,
    description: dictionary.page.svgPlayGround.metaData.description,
    openGraph: {
      title: dictionary.page.svgPlayGround.metaData.title,
      description: dictionary.page.svgPlayGround.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: getFullPageRouteWithDomain("svgPlayGround"),
      languages: {
        "en-US": getFullPageRouteWithDomain("svgPlayGround", "en"),
        "vi-VN": getFullPageRouteWithDomain("svgPlayGround", "vi"),
      },
    },
    keywords: ["svg", "tools", "svg editor", "svg playground", "svg formatter"],
  };
}

interface PageProps extends LocaleParams {}

async function Page({ params: { locale } }: PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.svgPlayGround.metaData.title}
      dictionary={dictionary}
      locale={locale}
    >
      <SvgEditor dictionary={dictionary} />
    </Layout>
  );
}

export default Page;
