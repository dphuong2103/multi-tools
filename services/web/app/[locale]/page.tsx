import { LinkWithLocale } from "@/components/link-with-locale";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import siteConfig from "@/constants/site-config";
import { Locale, localeMapping } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { pageToRouteMapping } from "@/models/routes";
import { LocaleParams } from "@/types/data-types";
import { Metadata } from "next";

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
    title: dictionary.page.home.metaData.title,
    description: dictionary.page.home.metaData.description,
    openGraph: {
      title: dictionary.page.home.metaData.title,
      description: dictionary.page.home.metaData.description,
      locale: locale,
      type: "website",
    },
    keywords: [
      "tools",
      "multi tools",
      "hex",
      "base64",
      "svg",
      "sql",
      "code editor",
    ],
    alternates: {
      canonical: `${siteConfig.url}`,
      languages: {
        "en-US": `${siteConfig.url}/${localeMapping.en}`,
        "vi-VN": `${siteConfig.url}/${localeMapping.vi}`,
      },
    },
  };
}

export default async function Home({ params: { locale } }: LocaleParams) {
  const dictionary = await getDictionary(locale);

  const conveterTools = [
    {
      title: dictionary.page.home.section.converterTools.items.hex,
      href: pageToRouteMapping.hex,
    },
    {
      title: dictionary.page.home.section.converterTools.items.base64,
      href: pageToRouteMapping.base64,
    },
  ];

  const imageTools = [
    {
      title: dictionary.page.home.section.imageTools.items.svg,
      href: pageToRouteMapping.svgPlayGround,
    },
  ];

  const formaterTools = [
    {
      title: dictionary.page.home.section.formatterTools.items.sql,
      href: pageToRouteMapping.sqlFormatter,
    },
  ];

  const codeEditorTools = [
    {
      title: dictionary.page.home.section.codeEditorTools.items.codeEditor,
      href: pageToRouteMapping.codeEditor,
    },
  ];

  return (
    <Layout
      title="Multi Tools"
      dictionary={dictionary}
      locale={locale}
      className="h-screen flex flex-col"
    >
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <Card title={dictionary.page.home.section.converterTools.title}>
            <div className="flex flex-col">
              {conveterTools.map((i) => (
                <Button
                  variant="link"
                  key={i.href}
                  className={"w-full justify-between px-0"}
                >
                  <LinkWithLocale href={i.href}>{i.title}</LinkWithLocale>
                </Button>
              ))}
            </div>
          </Card>
          <Card title={dictionary.page.home.section.imageTools.title}>
            <div className="flex flex-col">
              {imageTools.map((i) => (
                <Button
                  variant="link"
                  key={i.href}
                  className={"w-full justify-between px-0"}
                >
                  <LinkWithLocale href={i.href}>{i.title}</LinkWithLocale>
                </Button>
              ))}
            </div>
          </Card>
          <Card title={dictionary.page.home.section.formatterTools.title}>
            <div className="flex flex-col">
              {formaterTools.map((i) => (
                <Button
                  variant="link"
                  key={i.href}
                  className={"w-full justify-between px-0"}
                >
                  <LinkWithLocale href={i.href}>{i.title}</LinkWithLocale>
                </Button>
              ))}
            </div>
          </Card>
          <Card title={dictionary.page.home.section.codeEditorTools.title}>
            <div className="flex flex-col">
              {codeEditorTools.map((i) => (
                <Button
                  variant="link"
                  key={i.href}
                  className={"w-full justify-between px-0"}
                >
                  <LinkWithLocale href={i.href}>{i.title}</LinkWithLocale>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div className="my-prose">
          <h2>{dictionary.page.home.pageDescription.title}</h2>
          <p>{dictionary.page.home.pageDescription.description}</p>
        </div>
      </div>
    </Layout>
  );
}
