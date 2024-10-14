import siteConfig from '@/constants/site-config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: siteConfig.siteMap,
    }
}