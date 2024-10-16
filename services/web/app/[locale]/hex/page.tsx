import HexDetailsForm from "./hex-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";
import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import HowToUse from "./how-to-use";
import Features from "./features";
import What from "./what";
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
    title: dictionary.page.hex.metaData.title,
    description: dictionary.page.hex.metaData.description,
    openGraph: {
      title: dictionary.page.hex.metaData.title,
      description: dictionary.page.hex.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: getFullPageRouteWithDomain("hex", locale),
      languages: {
        "en-US": getFullPageRouteWithDomain("hex", "en"),
        "vi-VN": getFullPageRouteWithDomain("hex", "vi"),
      },
    },
    keywords: ["hex", "tools", "hex converter", "hex encode", "hex decode"],
  };
}

interface PageProps extends LocaleParams {}

async function Page({ params: { locale } }: PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.hex.title}
      dictionary={dictionary}
      locale={locale}
    >
      <div className="w-full flex flex-col justify-center gap-2">
        <HexDetailsForm dictionary={dictionary} />
        <HowToUse dictionary={dictionary} />
        <Features dictionary={dictionary} />
        <What dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default Page;
