import { Metadata, ResolvingMetadata } from "next";
import Base64DetailsForm from "./base64-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";
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
    title: dictionary.page.base64.metaData.title,
    description: dictionary.page.base64.metaData.description,
  };
}

interface Base64PageProps extends LocaleParams {}

async function Base64Page({ params: { locale } }: Base64PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.base64.title}
      dictionary={dictionary}
      locale={locale}
    >
      <div className="w-full flex flex-col justify-center gap-2">
        <Base64DetailsForm dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default Base64Page;
