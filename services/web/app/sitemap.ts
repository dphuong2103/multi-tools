import { getFullPageRouteWithDomain } from "@/models/routes";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getFullPageRouteWithDomain("home"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("home", "en"),
          vi: getFullPageRouteWithDomain("home", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("hex"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("hex", "en"),
          vi: getFullPageRouteWithDomain("hex", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("base64"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("base64", "en"),
          vi: getFullPageRouteWithDomain("base64", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("svgPlayGround"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("svgPlayGround", "en"),
          vi: getFullPageRouteWithDomain("svgPlayGround", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("sqlFormatter"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("sqlFormatter", "en"),
          vi: getFullPageRouteWithDomain("sqlFormatter", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("codeEditor"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("codeEditor", "en"),
          vi: getFullPageRouteWithDomain("codeEditor", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("aboutUs"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("aboutUs", "en"),
          vi: getFullPageRouteWithDomain("aboutUs", "vi"),
        },
      },
    },
    {
      url: getFullPageRouteWithDomain("contactUs"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: getFullPageRouteWithDomain("contactUs", "en"),
          vi: getFullPageRouteWithDomain("contactUs", "vi"),
        },
      },
    },
  ];
}
