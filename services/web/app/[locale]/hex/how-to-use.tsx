import { DictionaryProps } from "@/types/data-types";
import React from "react";

interface HowToUseProps extends DictionaryProps {}
function HowToUse({ dictionary }: HowToUseProps) {
  return (
    <div className="my-prose">
      <h2>{dictionary.page.hex.howToUse.title}</h2>
      {dictionary.page.hex.howToUse.description}
      <ul>
        <li>{dictionary.page.hex.howToUse.steps.step1}</li>
        <li>{dictionary.page.hex.howToUse.steps.step2}</li>
        <li>{dictionary.page.hex.howToUse.steps.step3}</li>
        <li>{dictionary.page.hex.howToUse.steps.step4}</li>
      </ul>
    </div>
  );
}

export default HowToUse;
