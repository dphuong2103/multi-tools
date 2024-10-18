export function parseTranslation(value: string, data: Record<string, string>) {
  return Object.entries(data).reduce((acc, [key, val]) => {
    const exists = acc.includes(`{${key}}`);
    if (!exists) {
      console.error(`Key ${key} does not exist in the translation string`);
    }
    const regex = new RegExp(`\\{${key}\\}`, "g");
    return acc.replace(regex, val);
  }, value);
}
