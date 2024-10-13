import HexDetailsForm from "./hex-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";
import type { Metadata } from "next";
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
    title: dictionary.page.hex.metaData.title,
    description: dictionary.page.hex.metaData.description,
    openGraph: {
      title: dictionary.page.hex.metaData.title,
      description: dictionary.page.hex.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: siteConfigs.url + "/" + locale + "/hex",
      languages:{
        'en-US':`${siteConfigs.url}/${localeMapping.en}/hex`,
        'vi-VN':`${siteConfigs.url}/${localeMapping.vi}/hex`,
      }
    },
    keywords:["hex","tools","hex converter","hex encode","hex decode"],
  };
}

interface HexPageProps extends LocaleParams { }

async function HexPage({ params: { locale } }: HexPageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.hex.title}
      dictionary={dictionary}
      locale={locale}
    >
      <div className="w-full flex flex-col justify-center gap-2">
        <HexDetailsForm dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default HexPage;
