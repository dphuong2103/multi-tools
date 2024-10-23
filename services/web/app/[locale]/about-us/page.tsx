import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import siteConfig from "@/constants/site-config";
import { Locale } from "@/i18n.config";
import { getDictionary, interpolateTranslations } from "@/lib/dictionary";
import { getFullPageRouteWithDomain } from "@/models/routes";
import { LocaleParams } from "@/types/data-types";
import { Metadata } from "next";
import React from "react";

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
    title: dictionary.page.aboutUs.metaData.title,
    description: dictionary.page.aboutUs.metaData.description,
    openGraph: {
      title: dictionary.page.aboutUs.metaData.title,
      description: dictionary.page.aboutUs.metaData.description,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: getFullPageRouteWithDomain("aboutUs", locale),
      languages: {
        "en-US": getFullPageRouteWithDomain("aboutUs", "en"),
        "vi-VN": getFullPageRouteWithDomain("aboutUs", "vi"),
      },
    },
    keywords: [],
  };
}

interface PageProps extends LocaleParams {}
async function page({ params: { locale } }: PageProps) {
  const dictionary = await getDictionary(locale);
  const whatWeDo = {
    title: dictionary.page.aboutUs.whatWeDo.title,
    description: dictionary.page.aboutUs.whatWeDo.description,
    items: Object.entries(dictionary.page.aboutUs.whatWeDo.items).reduce(
      (acc, [_key, value]) => {
        acc.push({ title: value.title, description: value.description });
        return acc;
      },
      [] as { title: string; description: string }[],
    ),
  };
  return (
    <Layout locale={locale} dictionary={dictionary} title={siteConfig.title}>
      <div className="my-prose flex flex-col gap-4">
        <h2 className="text-center">About Us</h2>
        <Card>
          <p>
            {interpolateTranslations(dictionary.page.aboutUs.description, {
              siteName: siteConfig.title,
            })}
          </p>
        </Card>
        <Card titleNode={<h2>{dictionary.page.aboutUs.recommended.title}</h2>}>
          <p>
            {interpolateTranslations(
              dictionary.page.aboutUs.recommended.description,
              { siteName: siteConfig.title },
            )}
          </p>
        </Card>
        <Card titleNode={<h2>{whatWeDo.title}</h2>}>
          <p>{whatWeDo.description}</p>
          <ul>
            {whatWeDo.items.map((i) => (
              <li key={i.title}>
                <span className="font-bold">{i.title}</span>: {i.description}
              </li>
            ))}
            <li>Many more...</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}

export default page;
