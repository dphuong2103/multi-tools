import HexDetailsForm from "./hex-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";
import type { Metadata, ResolvingMetadata } from "next";
import { Locale } from "@/i18n.config";

type MetadataProps = {
  params: {
    locale: Locale;
  };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = params.locale;
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.page.hex.metaData.title,
    description: dictionary.page.hex.metaData.description,
  };
}

interface HexPageProps extends LocaleParams {}

async function HexPage({ params: { locale } }: HexPageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.hex.title}
      dictionary={dictionary}
      locale={locale}
    >
      <div className="w-full flex flex-col justify-center gap-2">
        <HexDetailsForm dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default HexPage;
