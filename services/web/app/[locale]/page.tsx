import { LinkWithLocale } from "@/components/link-with-locale";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

export default async function Page({ params: { locale } }: LocaleParams) {
  const dictionary = await getDictionary(locale);

  const conveterTools = [
    {
      title: dictionary.page.home.section.converterTools.items.hex.title,
      tooltip: dictionary.page.home.section.converterTools.items.hex.tooltip,
      href: pageToRouteMapping.hex,
    },
    {
      title: dictionary.page.home.section.converterTools.items.base64.title,
      tooltip: dictionary.page.home.section.converterTools.items.base64.tooltip,
      href: pageToRouteMapping.base64,
    },
  ];

  const imageTools = [
    {
      title: dictionary.page.home.section.imageTools.items.svg.title,
      tooltip: dictionary.page.home.section.imageTools.items.svg.tooltip,
      href: pageToRouteMapping.svgPlayGround,
    },
  ];

  const formaterTools = [
    {
      title: dictionary.page.home.section.formatterTools.items.sql.title,
      tooltip: dictionary.page.home.section.formatterTools.items.sql.tooltip,
      href: pageToRouteMapping.sqlFormatter,
    },
  ];

  const codeEditorTools = [
    {
      title:
        dictionary.page.home.section.codeEditorTools.items.codeEditor.title,
      tooltip:
        dictionary.page.home.section.codeEditorTools.items.codeEditor.tooltip,
      href: pageToRouteMapping.codeEditor,
    },
  ];

  const sections = [
    {
      key: "converterTools",
      title: dictionary.page.home.section.converterTools.title,
      items: conveterTools,
    },
    {
      key: "imageTools",
      title: dictionary.page.home.section.imageTools.title,
      items: imageTools,
    },
    {
      key: "formaterTools",
      title: dictionary.page.home.section.formatterTools.title,
      items: formaterTools,
    },
    {
      key: "codeEditorTools",
      title: dictionary.page.home.section.codeEditorTools.title,
      items: codeEditorTools,
    },
  ];

  return (
    <Layout
      title={dictionary.page.home.title}
      dictionary={dictionary}
      locale={locale}
      className="h-screen flex flex-col"
    >
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          {sections.map((section) => (
            <Card title={section.title} key={section.key}>
              <div className="flex flex-col">
                {section.items.map((i) => (
                  <TooltipProvider delayDuration={400} key={i.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          className={"w-full justify-between px-0"}
                        >
                          <LinkWithLocale href={i.href}>
                            {i.title}
                          </LinkWithLocale>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{i.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="my-prose">
          <h2>{dictionary.page.home.pageDescription.title}</h2>
          <p>{dictionary.page.home.pageDescription.description}</p>
        </div>
      </div>
    </Layout>
  );
}
