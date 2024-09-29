import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multi-Tools for converting string, image,...",
  description:
    "Online tools for encoding, decoding hex, base64, online editing sv images",
};

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
                <Link href={i.href}>{i.title}</Link>
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
                <Link href={i.href}>{i.title}</Link>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
