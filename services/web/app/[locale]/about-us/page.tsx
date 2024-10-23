import Card from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import siteConfig from "@/constants/site-config";
import { getDictionary, interpolateTranslations } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import React from "react";

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
