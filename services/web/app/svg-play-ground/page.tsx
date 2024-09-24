import React from 'react'

import { Metadata } from 'next';
import SvgEditor from './svg-editor';

export const metadata: Metadata = {
  title: "SVG Playground",
  description: "Online SVG Code Editor",
}

function SvgPlayGroundPage() {
  return (
    <SvgEditor />
  )
}

export default SvgPlayGroundPage
