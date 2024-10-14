import { DictionaryProps } from "@/types/data-types";
import React from "react";

interface WhatProps extends DictionaryProps {}
function What({ dictionary }: WhatProps) {
  return (
    <div className="my-prose">
      <h2>{dictionary.page.base64.what.title}</h2>
      <p>{dictionary.page.base64.what.description}</p>
    </div>
  );
}

export default What;
