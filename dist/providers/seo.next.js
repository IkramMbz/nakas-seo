import { buildCanonicalUrl, getSeoConfig } from "../seo.core.js";
// SEO Utilities for NEXT.JS (App Router) :  uses native Next.js Metadata API
export function buildNextMetadata(metadata) {
    // 1. Metadata Setup
    const config = getSeoConfig();
    const siteName = config.siteName;
    const title = metadata.title
        ? `${metadata.title} ${config.titleSeparator} ${siteName}`
        : siteName;
    const description = metadata.description;
    const keywords = metadata.keywords || [];
    const canonical = buildCanonicalUrl(metadata.canonical || "/");
    const robotsConfig = metadata.noIndex || metadata.noFollow
        ? {
            index: !metadata.noIndex,
            follow: !metadata.noFollow,
            googleBot: {
                index: !metadata.noIndex,
                follow: !metadata.noFollow,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        }
        : {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        };
    const image = metadata.image || config.defaultOgImage;
    const imageAlt = metadata.imageAlt || config.defaultOgImageAlt;
    const imageUrl = image.startsWith("http")
        ? image
        : `${config.siteUrl}${image}`;
    // Determine type (only Next.js friendly values)
    const allowedTypes = [
        "website",
        "article",
        "book",
        "music.song",
        "video.movie",
    ];
    const type = allowedTypes.includes(metadata.type)
        ? metadata.type
        : "website";
    const alternates = metadata.locale
        ? {
            canonical,
            languages: {
                [config.siteLang]: canonical,
            },
        }
        : {
            canonical,
        };
    // 2. Metadata Building
    const nextMetadata = {
        metadataBase: new URL(config.siteUrl),
        title: title,
        description,
        keywords,
        alternates,
        openGraph: {
            type: type,
            url: canonical,
            title: title,
            description: description,
            siteName: siteName,
            images: [
                {
                    url: imageUrl,
                    width: config.defaultOgImageWidth,
                    height: config.defaultOgImageHeight,
                    alt: imageAlt,
                    type: config.defaultOgImageType,
                },
            ],
            locale: metadata.locale || config.siteLocale,
            ...(type === "article" &&
                metadata.publishedTime && {
                publishedTime: metadata.publishedTime,
            }),
            ...(type === "article" &&
                metadata.modifiedTime && {
                modifiedTime: metadata.modifiedTime,
            }),
            ...(type === "article" &&
                metadata.author && {
                authors: [metadata.author],
            }),
        },
        twitter: {
            card: config.twitterCardType,
            title: title,
            description: description,
            images: [imageUrl],
            ...(config.twitterHandle && {
                site: config.twitterHandle,
                creator: config.twitterHandle,
            }),
        },
        robots: robotsConfig,
        icons: {
            icon: config.icons.favicon,
            apple: config.icons.appleTouchIcon,
            shortcut: config.icons.shortcut,
            other: config.icons.other,
        },
        manifest: config.manifest,
        ...(config.googleSiteVerification && {
            verification: {
                google: config.googleSiteVerification,
                ...(config.bingSiteVerification && {
                    other: {
                        "msvalidate.01": config.bingSiteVerification,
                    },
                }),
            },
        }),
    };
    return nextMetadata;
}
//# sourceMappingURL=seo.next.js.map