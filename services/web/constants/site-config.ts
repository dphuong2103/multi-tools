const siteConfig = {
  url: "https://multitools.site",
  title: "MultiTools",
  description: "All the tools you need in one place",
  author: "Midouz",
  mail: "midouz.project@gmail.com",
  telegramLink: "https://t.me/dphuong2103",
} as const;
export type SiteConfig = typeof siteConfig;

export default siteConfig;