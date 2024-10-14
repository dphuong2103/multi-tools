import { DictionaryProps } from "@/types/data-types";
import React from "react";

interface HowToUseProps extends DictionaryProps {}
function HowToUse({ dictionary }: HowToUseProps) {
  return (
    <div className="my-prose">
      <h2>{dictionary.page.base64.howToUse.title}</h2>
      {dictionary.page.base64.howToUse.description}
      <ul>
        <li>{dictionary.page.base64.howToUse.steps.step1}</li>
        <li>{dictionary.page.base64.howToUse.steps.step2}</li>
        <li>{dictionary.page.base64.howToUse.steps.step3}</li>
        <li>{dictionary.page.base64.howToUse.steps.step4}</li>
      </ul>
    </div>
  );
}

export default HowToUse;
