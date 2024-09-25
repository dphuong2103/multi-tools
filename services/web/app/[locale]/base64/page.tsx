import { Metadata } from "next";
import Base64DetailsForm from "./base64-details-form";
import Layout from "@/components/ui/layout";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";

export const metadata: Metadata = {
  title: "Base64 Converter",
  description: "Online Base64 Converter Tool",
};

interface Base64PageProps extends LocaleParams {}

async function Base64Page({ params: { locale } }: Base64PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout title="Base64 Converter">
      <div className="w-full flex flex-col justify-center gap-2">
        <Base64DetailsForm dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default Base64Page;
