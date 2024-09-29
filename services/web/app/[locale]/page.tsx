import { LinkWithLocale } from "@/components/link-with-locale";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
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
  };
}

export default async function Home({ params: { locale } }: LocaleParams) {
  const dictionary = await getDictionary(locale);
  const conveterTools = [
    {
      title: dictionary.page.home.section.converterTools.items.hex,
      href: "/hex",
    },
    {
      title: dictionary.page.home.section.converterTools.items.base64,
      href: "/base64",
    },
  ];

  const imageTools = [
    {
      title: dictionary.page.home.section.imageTools.items.svg,
      href: "/svg-play-ground",
    },
  ];

  return (
    <Layout title="Multi Tools" dictionary={dictionary} locale={locale}>
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
      </div>
    </Layout>
  );
}
