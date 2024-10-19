import { Form } from "@/components/ui/form";
import Layout from "@/components/ui/layout";
import siteConfig from "@/constants/site-config";
import { Locale } from "@/i18n.config";
import { getDictionary, interpolateTranslations } from "@/lib/dictionary";
import { getFullPageRouteWithDomain } from "@/models/routes";
import { LocaleParams } from "@/types/data-types";
import { Metadata } from "next";
import React from "react";
import ContactUsFormDetails from "./contact-us-form-details";
import Card from "@/components/ui/card";

interface PageProps extends LocaleParams {}
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
    title: dictionary.page.contactUs.metaData.title,
    description: dictionary.page.contactUs.metaData.description,
    openGraph: {
      title: dictionary.page.contactUs.metaData.title,
      description: dictionary.page.contactUs.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: getFullPageRouteWithDomain("contactUs", locale),
      languages: {
        "en-US": getFullPageRouteWithDomain("contactUs", "en"),
        "vi-VN": getFullPageRouteWithDomain("contactUs", "vi"),
      },
    },
    keywords: [],
  };
}

async function page({ params: { locale } }: PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.contactUs.title}
      dictionary={dictionary}
      locale={locale}
    >
      <Card className="p-7">
        <p>
          {interpolateTranslations(dictionary.page.contactUs.description, {
            siteName: siteConfig.title,
          })}
        </p>
        <ContactUsFormDetails dictionary={dictionary} />
      </Card>
    </Layout>
  );
}

export default page;
