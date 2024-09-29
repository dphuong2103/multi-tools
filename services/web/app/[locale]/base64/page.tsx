import { Metadata } from "next";
import Base64DetailsForm from "./base64-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Base64 to text and viceversa",
  description:
    "Convert base64 to text and base64 decode strings. Online tool for base64 decoding a string. Convert a base64 encoded text into an decoded string",
};

interface Base64PageProps extends LocaleParams {}

async function Base64Page({ params: { locale } }: Base64PageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout title="Base64 Converter" dictionary={dictionary} locale={locale}>
      <div className="w-full flex flex-col justify-center gap-2">
        <Base64DetailsForm dictionary={dictionary} />
      </div>
    </Layout>
  );
}

export default Base64Page;
