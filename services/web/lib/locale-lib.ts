export function parseTranslation(value: string, data: Record<string, string>) {
  return Object.entries(data).reduce((acc, [key, val]) => {
    return acc.replace(`{${key}}`, val);
  }, value);
}
