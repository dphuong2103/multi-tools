import { DictionaryProps } from "@/types/data-types";
import React from "react";

interface FeaturesProps extends DictionaryProps {}
function Features({ dictionary }: FeaturesProps) {
  const features = dictionary.page.base64.features;
  const items = Object.entries(features.items).reduce(
    (acc, [_key, value]) => {
      acc.push({
        title: (value as { title: string; description: string }).title,
        description: (value as { title: string; description: string })
          .description,
      });
      return acc;
    },
    [] as { title: string; description: string }[],
  );

  return (
    <div className="my-prose">
      <h2>{features.title}</h2>
      {features.description}
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Features;
