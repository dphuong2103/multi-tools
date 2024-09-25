import React from 'react'

import { Metadata } from 'next';
import SvgEditor from './svg-editor';
import Layout from '@/components/ui/layout';
import { getDictionary } from '@/lib/dictionary';
import { LocaleParams } from '@/types/data-types';

export const metadata: Metadata = {
  title: "SVG Playground",
  description: "Online SVG Code Editor",
}

interface SvgPlayGroundPageProps extends LocaleParams { }

async function SvgPlayGroundPage({ params: { locale } }: SvgPlayGroundPageProps) {
  const dictionary = await getDictionary(locale)
  return (
    <Layout title="SVG Playground">
      <SvgEditor dictionary={dictionary} />
    </Layout>
  )
}

export default SvgPlayGroundPage
