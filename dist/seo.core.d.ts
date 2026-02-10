type IconLink = {
    rel: string;
    url: string;
    type?: string;
    sizes?: string;
    color?: string;
};
type SeoConfig = {
    siteName: string;
    siteFullName: string;
    siteUrl: string;
    siteLang: string;
    siteLocale: string;
    titleSeparator: string;
    defaultOgImage: string;
    defaultOgImageWidth: number;
    defaultOgImageHeight: number;
    defaultOgImageAlt: string;
    defaultOgImageType: string;
    icons: {
        favicon: string;
        appleTouchIcon: string;
        shortcut: string;
        other?: IconLink[];
    };
    twitterHandle?: string;
    twitterCardType: "summary" | "summary_large_image" | "app" | "player";
    manifest?: string;
    googleSiteVerification?: string;
    bingSiteVerification?: string;
};
export declare const SEO_RULES: {
    TITLE_MIN: number;
    TITLE_MAX: number;
    DESCRIPTION_MIN: number;
    DESCRIPTION_MAX: number;
    WORD_COUNT_MIN: number;
    CHAR_COUNT_MIN: number;
    OG_PREVIEW_LENGTH: number;
    CHAR_BY_SENTENCE_MIN: number;
    KEYWORDS_MIN: number;
    KEYWORDS_MAX: number;
    RESOURCES_MAX_CSS_SCRIPTS: number;
    RESOURCES_MAX_BLOCKING_SCRIPTS: number;
};
export declare const DEFAULT_SEO_CONFIG: SeoConfig;
export declare function initSeoConfig(config: Partial<SeoConfig>): void;
export declare function getSeoConfig(): SeoConfig;
export declare function buildCanonicalUrl(pageUrl: string, baseUrl?: string): string;
export {};
//# sourceMappingURL=seo.core.d.ts.map