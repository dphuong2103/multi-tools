import React from "react";

import { Metadata, ResolvingMetadata } from "next";
import Layout from "@/components/ui/layout";
import { getDictionary } from "@/lib/dictionary";
import { LocaleParams } from "@/types/data-types";
import { Locale } from "@/i18n.config";
import CodeEditor from "./code-editor";

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
    title: dictionary.page.codeEditor.metaData.title,
    description: dictionary.page.codeEditor.metaData.description,
  };
}
interface CodeEditorPageProps extends LocaleParams {}

async function CodeEditorPage({ params: { locale } }: CodeEditorPageProps) {
  const dictionary = await getDictionary(locale);
  return (
    <Layout
      title={dictionary.page.codeEditor.title}
      dictionary={dictionary}
      locale={locale}
    >
      <CodeEditor dictionary={dictionary} />
    </Layout>
  );
}

export default CodeEditorPage;
