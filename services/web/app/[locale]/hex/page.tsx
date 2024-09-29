import { Metadata } from "next";
import HexDetailsForm from "./hex-details-form";
import Layout from "@/components/ui/layout";
import { LocaleParams } from "@/types/data-types";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Hex to text and viceversa",
  description:
    "Convert hex to text and hex decode strings. Online tool for hex decoding a string. Convert a hexadecimaly encoded text into an decoded string",
};

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
