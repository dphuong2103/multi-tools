import { Metadata } from "next";
import Base64DetailsForm from "./base64-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";
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
    title: dictionary.page.base64.metaData.title,
    description: dictionary.page.base64.metaData.description,
    openGraph: {
      title: dictionary.page.base64.metaData.title,
      description: dictionary.page.base64.metaData.description,
      locale: locale,
      type: "website",
    },
    keywords:["base64","tools","bas64 converter","base64 encode","base64 decode"],
    alternates: {
      canonical: siteConfigs.url + "/" + locale + "/base64",
      languages:{
        'en-US':`${siteConfigs.url}/${localeMapping.en}/base64`,
        'vi-VN':`${siteConfigs.url}/${localeMapping.vi}/base64`,
      }
    },
    
  };
}

interface Base64PageProps extends LocaleParams { }

async function Base64Page({ params: { locale } }: Base64PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.base64.title}
      dictionary={dictionary}
      locale={locale}
    >
      <div className="w-full flex flex-col justify-center gap-2">
        <Base64DetailsForm dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default Base64Page;
