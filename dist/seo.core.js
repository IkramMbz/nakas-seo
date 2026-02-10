export const SEO_RULES = {
    TITLE_MIN: 30,
    TITLE_MAX: 60,
    DESCRIPTION_MIN: 120,
    DESCRIPTION_MAX: 150,
    WORD_COUNT_MIN: 150,
    CHAR_COUNT_MIN: 300,
    OG_PREVIEW_LENGTH: 90,
    CHAR_BY_SENTENCE_MIN: 21,
    KEYWORDS_MIN: 3,
    KEYWORDS_MAX: 9,
    RESOURCES_MAX_CSS_SCRIPTS: 9,
    RESOURCES_MAX_BLOCKING_SCRIPTS: 9,
};
// Default Configuration
export const DEFAULT_SEO_CONFIG = {
    siteName: "MonSite",
    siteFullName: "Mon Site Complet",
    siteUrl: "https://monsite.com",
    siteLang: "fr",
    siteLocale: "fr_FR",
    titleSeparator: "|",
    defaultOgImage: "/images/og-default.jpg",
    defaultOgImageWidth: 1200,
    defaultOgImageHeight: 630,
    defaultOgImageAlt: "Image par défaut",
    defaultOgImageType: "image/jpeg",
    icons: {
        favicon: "/favicon.ico",
        appleTouchIcon: "/apple-180x180.png",
        shortcut: "/favicon-32x32.png",
        other: [
            {
                rel: "mask-icon",
                url: "/assets/media/img/manifest/favicon-32x32.png",
                color: "#000000",
            },
            {
                rel: "me",
                url: "https://twitter.com/yourbrand",
            },
            {
                rel: "me",
                url: "https://www.linkedin.com/company/yourbrand",
            },
            {
                rel: "me",
                url: "https://github.com/yourbrand",
            },
        ],
    },
    twitterCardType: "summary_large_image",
    // manifest: "/manifest.json",
    googleSiteVerification: "ton-code-google-search-console",
};
// Singleton instance
let seoConfigInstance = DEFAULT_SEO_CONFIG;
// Initialize SEO configuration : call this at app startup with your custom config
export function initSeoConfig(config) {
    seoConfigInstance = {
        ...DEFAULT_SEO_CONFIG,
        ...config,
    };
}
export function getSeoConfig() {
    return seoConfigInstance;
}
export function buildCanonicalUrl(pageUrl, baseUrl) {
    const base = baseUrl || seoConfigInstance.siteUrl;
    const cleanUrl = pageUrl.startsWith("/") ? pageUrl : `/${pageUrl}`;
    return `${base}${cleanUrl}`;
}
//# sourceMappingURL=seo.core.js.map