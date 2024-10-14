import { DictionaryProps } from "@/types/data-types";
import React from "react";

interface WhatProps extends DictionaryProps {}
function What({ dictionary }: WhatProps) {
  return (
    <div className="my-prose">
      <h2>{dictionary.page.hex.what.title}</h2>
      <p>{dictionary.page.hex.what.description}</p>
    </div>
  );
}

export default What;
