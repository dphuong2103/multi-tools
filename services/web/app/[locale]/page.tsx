import LinkWithLocale from "@/components/link-with-locale";
import { buttonVariants } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import siteConfig from "@/constants/site-config";
import { Locale } from "@/i18n.config";
import { getDictionary, interpolateTranslations } from "@/lib/dictionary";
import {
  getFullPageRouteWithDomain,
  pageToRouteMapping,
} from "@/models/routes";
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
      canonical: getFullPageRouteWithDomain("home", locale),
      languages: {
        "en-US": getFullPageRouteWithDomain("home", "en"),
        "vi-VN": getFullPageRouteWithDomain("home", "vi"),
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
  const whyUseItems = Object.entries(dictionary.page.home.whyUse.items).reduce(
    (acc, [key, value]) => {
      acc.push({ title: value.title, description: value.description });
      return acc;
    },
    [] as { title: string; description: string }[],
  );

  const whyUserSection = {
    title: dictionary.page.home.whyUse.title,
    description: dictionary.page.home.whyUse.description,
    items: whyUseItems,
  };

  const whoBenefitSection = {
    title: dictionary.page.home.whoBenefit.title,
    description: dictionary.page.home.whoBenefit.description,
    items: Object.entries(dictionary.page.home.whoBenefit.items).reduce(
      (acc, [key, value]) => {
        acc.push({ title: value.title, description: value.description });
        return acc;
      },
      [] as { title: string; description: string }[],
    ),
  };

  return (
    <Layout
      title={dictionary.page.home.title}
      dictionary={dictionary}
      locale={locale}
      className="h-screen flex flex-col"
    >
      <div className="flex flex-col gap-4 pb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {sections.map((section) => (
            <Card title={section.title} key={section.key}>
              <div className="flex flex-col">
                {section.items.map((i) => (
                  <TooltipProvider delayDuration={400} key={i.href}>
                    <Tooltip>
                      <TooltipTrigger
                        className={buttonVariants({
                          variant: "link",
                          className: "w-full justify-between px-0",
                        })}
                        asChild
                      >
                        <LinkWithLocale
                          href={i.href}
                          className="w-full text-left"
                        >
                          {i.title}
                        </LinkWithLocale>
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
        <Card>
          <div className="my-prose">
            <h2>
              {interpolateTranslations(
                dictionary.page.home.pageDescription.title,
                {
                  siteName: siteConfig.title,
                },
              )}
            </h2>
            <p>
              {interpolateTranslations(
                dictionary.page.home.pageDescription.description,
                { siteName: siteConfig.title },
              )}
            </p>
          </div>
        </Card>
        <Card>
          <div className="my-prose">
            <h2>
              {interpolateTranslations(whyUserSection.title, {
                siteName: siteConfig.title,
              })}
            </h2>
            <p>
              {interpolateTranslations(whyUserSection.description, {
                siteName: siteConfig.title,
              })}
            </p>
            <ul>
              {whyUserSection.items.map((item) => (
                <li key={item.title}>
                  <span className="font-bold">{item.title}</span>:{" "}
                  {interpolateTranslations(item.description, {
                    siteName: siteConfig.title,
                  })}
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <Card>
          <div className="my-prose">
            <h2>
              {interpolateTranslations(whoBenefitSection.title, {
                siteName: siteConfig.title,
              })}
            </h2>
            <p>
              {interpolateTranslations(whoBenefitSection.description, {
                siteName: siteConfig.title,
              })}
            </p>
            <ul>
              {whoBenefitSection.items.map((item) => (
                <li key={item.title}>
                  <span className="font-bold">{item.title}</span>:{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
