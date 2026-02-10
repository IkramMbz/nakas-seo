import { SEO_RULES } from "./seo.core.js";
import { SeoAuditResult, SeoCheckResult } from "./types.js";

// Page type detection
const getPageType = (): string => {
  const ogType = document.querySelector<HTMLMetaElement>(
    'meta[property="og:type"]'
  )?.content;
  return ogType || "website";
};

const isArticlePage = (): boolean => getPageType() === "article";
const isProductPage = (): boolean => getPageType() === "product";

export function runSeoAudit(): SeoAuditResult {
  // Performance-optimized DOM cache with lazy evaluation
  const cache = {
    _title: null as string | null,
    get title(): string {
      return (this._title ??= document.title || "");
    },

    _docElement: null as HTMLElement | null,
    get docElement(): HTMLElement {
      return (this._docElement ??= document.documentElement);
    },

    _body: null as HTMLElement | null,
    get body(): HTMLElement {
      return (this._body ??= document.body);
    },

    _head: null as HTMLHeadElement | null,
    get head(): HTMLHeadElement {
      return (this._head ??= document.head);
    },

    _metaDescription: undefined as HTMLMetaElement | null | undefined,
    get metaDescription(): HTMLMetaElement | null {
      return (this._metaDescription ??= document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      ));
    },

    _metaRobots: undefined as HTMLMetaElement | null | undefined,
    get metaRobots(): HTMLMetaElement | null {
      return (this._metaRobots ??= document.querySelector<HTMLMetaElement>(
        'meta[name="robots"]'
      ));
    },

    _metaViewport: undefined as HTMLMetaElement | null | undefined,
    get metaViewport(): HTMLMetaElement | null {
      return (this._metaViewport ??= document.querySelector<HTMLMetaElement>(
        'meta[name="viewport"]'
      ));
    },

    _canonical: undefined as HTMLLinkElement | null | undefined,
    get canonical(): HTMLLinkElement | null {
      return (this._canonical ??= document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]'
      ));
    },

    _ogTitle: undefined as HTMLMetaElement | null | undefined,
    get ogTitle(): HTMLMetaElement | null {
      return (this._ogTitle ??= document.querySelector<HTMLMetaElement>(
        'meta[property="og:title"]'
      ));
    },

    _ogDescription: undefined as HTMLMetaElement | null | undefined,
    get ogDescription(): HTMLMetaElement | null {
      return (this._ogDescription ??= document.querySelector<HTMLMetaElement>(
        'meta[property="og:description"]'
      ));
    },

    _ogImage: undefined as HTMLMetaElement | null | undefined,
    get ogImage(): HTMLMetaElement | null {
      return (this._ogImage ??= document.querySelector<HTMLMetaElement>(
        'meta[property="og:image"]'
      ));
    },

    _ogType: undefined as HTMLMetaElement | null | undefined,
    get ogType(): HTMLMetaElement | null {
      return (this._ogType ??= document.querySelector<HTMLMetaElement>(
        'meta[property="og:type"]'
      ));
    },

    _images: null as HTMLImageElement[] | null,
    get images(): HTMLImageElement[] {
      return (this._images ??= Array.from(
        document.querySelectorAll<HTMLImageElement>("img")
      ));
    },

    _links: null as HTMLAnchorElement[] | null,
    get links(): HTMLAnchorElement[] {
      return (this._links ??= Array.from(
        document.querySelectorAll<HTMLAnchorElement>("a[href]")
      ));
    },

    _headings: null as HTMLHeadingElement[] | null,
    get headings(): HTMLHeadingElement[] {
      return (this._headings ??= Array.from(
        document.querySelectorAll<HTMLHeadingElement>("h1,h2,h3,h4,h5,h6")
      ));
    },

    _scripts: null as HTMLScriptElement[] | null,
    get scripts(): HTMLScriptElement[] {
      return (this._scripts ??= Array.from(
        document.querySelectorAll<HTMLScriptElement>("script[src]")
      ));
    },

    _schemas: null as NodeListOf<Element> | null,
    get schemas(): NodeListOf<Element> {
      return (this._schemas ??= document.querySelectorAll(
        'script[type="application/ld+json"]'
      ));
    },

    _hreflangLinks: null as HTMLLinkElement[] | null,
    get hreflangLinks(): HTMLLinkElement[] {
      return (this._hreflangLinks ??= Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="alternate"][hreflang]'
        )
      ));
    },

    _mainContent: undefined as HTMLElement | null | undefined,
    get mainContent(): HTMLElement | null {
      return (this._mainContent ??=
        document.querySelector<HTMLElement>("main#main-content"));
    },

    _hostname: null as string | null,
    get hostname(): string {
      return (this._hostname ??= location.hostname);
    },

    _currentUrl: null as string | null,
    get currentUrl(): string {
      return (this._currentUrl ??= location.href.split(/[?#]/)[0]);
    },
  };

  const checks: Record<string, SeoCheckResult> = {};

  // 1. DOCUMENT FOUNDATION
  checks.html5Structure = ((): SeoCheckResult => {
    const hasDoctype = document.doctype?.name === "html";
    const obsoleteTags = document.querySelectorAll(
      "font,center,bgsound,marquee,big,strike,tt,frame,frameset"
    );

    if (!hasDoctype) {
      return { status: "error", message: "Missing HTML5 doctype" };
    }
    if (obsoleteTags.length > 0) {
      return {
        status: "error",
        message: `${obsoleteTags.length} obsolete HTML tags found`,
      };
    }
    return { status: "success", message: "Valid HTML5 structure" };
  })();

  checks.charset = ((): SeoCheckResult => {
    const charset = document.characterSet?.toUpperCase();
    if (!charset) {
      return { status: "error", message: "Missing charset declaration" };
    }
    if (charset !== "UTF-8") {
      return {
        status: "warning",
        message: `Non-standard charset: ${charset} (UTF-8 recommended)`,
      };
    }
    return { status: "success", message: "UTF-8" };
  })();

  checks.lang = ((): SeoCheckResult => {
    const lang = cache.docElement.lang;
    if (!lang) {
      return { status: "error", message: "Missing lang attribute on <html>" };
    }
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) {
      return { status: "warning", message: `Invalid language code: ${lang}` };
    }
    return { status: "success", message: `Language: ${lang}` };
  })();

  checks.viewport = ((): SeoCheckResult => {
    if (!cache.metaViewport) {
      return {
        status: "error",
        message: "Missing viewport meta tag (critical for mobile)",
      };
    }
    const content = cache.metaViewport.content;
    if (!content.includes("width=device-width")) {
      return {
        status: "warning",
        message: "Viewport missing width=device-width",
      };
    }
    return { status: "success", message: content };
  })();

  checks.manifestFile = ((): SeoCheckResult => {
    const manifest = document.querySelector<HTMLLinkElement>(
      'link[rel="manifest"]'
    );
    if (!manifest) {
      return { status: "info", message: "No manifest.json (PWA recommended)" };
    }
    return { status: "success", message: `Found: ${manifest.href}` };
  })();

  // 2. INDEXATION & CRAWLING
  checks.robotsMeta = ((): SeoCheckResult => {
    if (!cache.metaRobots) {
      return {
        status: "success",
        message: "Default indexing (no robots directive)",
      };
    }

    const content = cache.metaRobots.content.toLowerCase();
    const directives = content.split(",").map((d) => d.trim());

    if (directives.includes("noindex")) {
      return {
        status: "error",
        message: `⚠️ NOINDEX active: ${cache.metaRobots.content}`,
      };
    }
    if (directives.includes("nofollow")) {
      return {
        status: "warning",
        message: `NOFOLLOW active: ${cache.metaRobots.content}`,
      };
    }

    return { status: "success", message: cache.metaRobots.content };
  })();

  checks.canonical = ((): SeoCheckResult => {
    if (!cache.canonical) {
      return { status: "warning", message: "Missing canonical URL" };
    }

    const href = cache.canonical.href;
    try {
      const url = new URL(href);

      if (url.protocol !== "https:") {
        return { status: "warning", message: "Canonical should use HTTPS" };
      }

      const canonicalUrl = href.split(/[?#]/)[0];
      const isLocalhost =
        cache.hostname === "localhost" || cache.hostname === "127.0.0.1";

      if (!isLocalhost && canonicalUrl !== cache.currentUrl) {
        return {
          status: "warning",
          message: `Canonical mismatch: ${canonicalUrl}`,
        };
      }

      return { status: "success", message: href };
    } catch {
      return { status: "error", message: "Invalid canonical URL" };
    }
  })();

  checks.robotsTxt = ((): SeoCheckResult => {
    return { status: "info", message: "Ensure robots.txt exists in /public" };
  })();

  checks.sitemapXml = ((): SeoCheckResult => {
    return {
      status: "info",
      message:
        "Ensure sitemap.xml exists in /public or App Router (for Next.js)",
    };
  })();

  // 3. PRIMARY METADATA
  checks.title = ((): SeoCheckResult => {
    const length = cache.title.length;

    if (!length) {
      return { status: "error", message: "Missing title tag" };
    }
    if (length < SEO_RULES.TITLE_MIN) {
      return {
        status: "warning",
        message: `Too short: ${length}/${SEO_RULES.TITLE_MIN}-${SEO_RULES.TITLE_MAX} chars`,
      };
    }
    if (length > SEO_RULES.TITLE_MAX) {
      return {
        status: "warning",
        message: `Too long: ${length}/${SEO_RULES.TITLE_MAX} chars (truncated in SERPs)`,
      };
    }
    return { status: "success", message: `${length} chars: ${cache.title}` };
  })();

  checks.metaDescription = ((): SeoCheckResult => {
    const content = cache.metaDescription?.content || "";
    const length = content.length;

    if (!cache.metaDescription) {
      return { status: "error", message: "Missing meta description" };
    }
    if (length < SEO_RULES.DESCRIPTION_MIN) {
      return {
        status: "warning",
        message: `Too short: ${length}/${SEO_RULES.DESCRIPTION_MIN}-${SEO_RULES.DESCRIPTION_MAX} chars`,
      };
    }
    if (length > SEO_RULES.DESCRIPTION_MAX) {
      return {
        status: "warning",
        message: `Too long: ${length}/${SEO_RULES.DESCRIPTION_MAX} chars (truncated in SERPs)`,
      };
    }
    return { status: "success", message: `${length} chars: ${content}` };
  })();

  checks.metaKeywords = ((): SeoCheckResult => {
    const keywords = document.querySelector<HTMLMetaElement>(
      'meta[name="keywords"]'
    );

    if (!keywords?.content) {
      return { status: "success", message: "Not used (obsolete for Google)" };
    }

    const keywordList = keywords.content
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (keywordList.length > SEO_RULES.KEYWORDS_MAX) {
      return {
        status: "warning",
        message: `Excessive: ${keywordList.length} > ${SEO_RULES.KEYWORDS_MAX}`,
      };
    }
    if (keywordList.length < SEO_RULES.KEYWORDS_MIN) {
      return {
        status: "warning",
        message: `Minimal: ${keywordList.length} < ${SEO_RULES.KEYWORDS_MIN}`,
      };
    }

    return { status: "success", message: `${keywordList.length} keywords` };
  })();

  checks.metaAuthor = ((): SeoCheckResult => {
    if (!isArticlePage()) {
      return { status: "success", message: "N/A (non-article page)" };
    }

    const author = document.querySelector<HTMLMetaElement>(
      'meta[name="author"]'
    );
    if (!author?.content) {
      return {
        status: "warning",
        message: "Missing author meta (credibility for articles)",
      };
    }

    return { status: "success", message: `Author: ${author.content}` };
  })();

  // 4. CONTENT STRUCTURE
  checks.h1 = ((): SeoCheckResult => {
    const h1s = cache.headings.filter((h) => h.tagName === "H1");

    if (h1s.length === 0) {
      return { status: "error", message: "No H1 found" };
    }
    if (h1s.length > 1) {
      return {
        status: "warning",
        message: `${h1s.length} H1 tags (only 1 recommended)`,
      };
    }

    const h1Text = h1s[0].textContent?.trim() || "";
    if (!h1Text) {
      return { status: "error", message: "H1 is empty" };
    }
    if (h1Text.length < 20) {
      return { status: "warning", message: `Short H1: "${h1Text}"` };
    }

    return {
      status: "success",
      message: `"${h1Text.slice(0, 60)}${h1Text.length > 60 ? "..." : ""}"`,
    };
  })();

  checks.headingHierarchy = ((): SeoCheckResult => {
    if (cache.headings.length === 0) {
      return { status: "error", message: "No heading tags found" };
    }

    const issues: string[] = [];
    let lastLevel = 0;

    cache.headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1], 10);

      if (lastLevel > 0 && level > lastLevel + 1) {
        issues.push(`Skip H${lastLevel}→H${level} at position ${index + 1}`);
      }

      const text = heading.textContent?.trim();
      if (!text) {
        issues.push(`Empty ${heading.tagName} at position ${index + 1}`);
      }

      lastLevel = level;
    });

    if (issues.length > 0) {
      return { status: "warning", message: issues.join("; ") };
    }

    return {
      status: "success",
      message: `${cache.headings.length} headings with proper hierarchy`,
    };
  })();

  // 5. CONTENT QUALITY
  checks.contentLengthAndQuality = ((): SeoCheckResult => {
    if (!cache.mainContent) {
      return { status: "error", message: 'Missing <main id="main-content">' };
    }

    const clone = cache.mainContent.cloneNode(true) as HTMLElement;
    clone
      .querySelectorAll(
        "nav,footer,header,aside,button,svg,noscript,script,style"
      )
      .forEach((el) => el.remove());

    const text = (clone.textContent || "").replace(/\s+/g, " ").trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const charCount = text.length;

    if (charCount < SEO_RULES.CHAR_COUNT_MIN) {
      return {
        status: "error",
        message: `Insufficient: ${charCount} < ${SEO_RULES.CHAR_COUNT_MIN} chars`,
      };
    }
    if (wordCount < SEO_RULES.WORD_COUNT_MIN) {
      return {
        status: "warning",
        message: `Low: ${wordCount} < ${SEO_RULES.WORD_COUNT_MIN} words`,
      };
    }

    return {
      status: "success",
      message: `${wordCount} words, ${charCount} chars`,
    };
  })();

  checks.sentenceReadability = ((): SeoCheckResult => {
    if (!cache.mainContent) {
      return { status: "error", message: 'Missing <main id="main-content">' };
    }

    const text = cache.mainContent.textContent?.trim() || "";
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    if (sentences.length === 0) {
      return { status: "warning", message: "No readable sentences" };
    }

    const totalWords = text.split(/\s+/).filter(Boolean).length;
    const avgWordsPerSentence = totalWords / sentences.length;
    const longSentences = sentences.filter(
      (s) => s.trim().split(/\s+/).length > 25
    );

    if (longSentences.length > sentences.length * 0.5) {
      return {
        status: "warning",
        message: `${longSentences.length} long sentences (avg ${Math.round(avgWordsPerSentence)} words/sentence)`,
      };
    }

    return {
      status: "success",
      message: `Avg ${Math.round(avgWordsPerSentence)} words/sentence`,
    };
  })();

  checks.duplicateContent = ((): SeoCheckResult => {
    if (!cache.mainContent) {
      return { status: "error", message: 'Missing <main id="main-content">' };
    }

    const text = cache.mainContent.textContent || "";
    const sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > SEO_RULES.CHAR_BY_SENTENCE_MIN);

    const seen = new Set<string>();
    const duplicates = sentences.filter((s) => {
      if (seen.has(s)) return true;
      seen.add(s);
      return false;
    });

    if (duplicates.length > 5) {
      return {
        status: "warning",
        message: `${duplicates.length} duplicate sentences detected`,
      };
    }

    return { status: "success", message: "No significant duplication" };
  })();

  // 6. IMAGE OPTIMIZATION
  checks.imagesAttributes = ((): SeoCheckResult => {
    if (cache.images.length === 0) {
      return { status: "success", message: "No images" };
    }

    const withoutAlt = cache.images.filter((img) => !img.alt?.trim());
    const withoutDimensions = cache.images.filter(
      (img) => !img.width || !img.height
    );
    const withoutLazy = cache.images.filter(
      (img) => img.loading !== "lazy" && !img.hasAttribute("loading")
    );

    const warnings: string[] = [];

    if (withoutAlt.length > 0) {
      warnings.push(`${withoutAlt.length}/${cache.images.length} missing alt`);
    }
    if (withoutDimensions.length > cache.images.length * 0.3) {
      warnings.push(`${withoutDimensions.length} missing dimensions (CLS)`);
    }
    if (
      withoutLazy.length > cache.images.length * 0.5 &&
      cache.images.length > 3
    ) {
      warnings.push(`${withoutLazy.length} not lazy-loaded`);
    }

    if (warnings.length > 0) {
      return { status: "warning", message: warnings.join("; ") };
    }

    return {
      status: "success",
      message: `${cache.images.length} images optimized`,
    };
  })();

  checks.imageFormats = ((): SeoCheckResult => {
    if (cache.images.length === 0) {
      return { status: "success", message: "No images" };
    }

    const modernFormats = ["webp", "avif"];
    const sources = Array.from(document.querySelectorAll("picture source"));
    const hasModernFormat = sources.some((s) => {
      const type = s.getAttribute("type") || "";
      return modernFormats.some((f) => type.includes(f));
    });

    const legacyImages = cache.images.filter((img) =>
      /\.(jpe?g|png)$/i.test(img.src)
    );

    if (legacyImages.length > cache.images.length * 0.7 && !hasModernFormat) {
      return {
        status: "warning",
        message: `${legacyImages.length} legacy formats (use WebP/AVIF)`,
      };
    }

    return { status: "success", message: "Modern formats used" };
  })();

  // 7. INTERNAL LINKING
  checks.links = ((): SeoCheckResult => {
    if (cache.links.length === 0) {
      return { status: "warning", message: "No links found" };
    }

    const internal = cache.links.filter((a) => {
      try {
        return new URL(a.href, location.href).hostname === cache.hostname;
      } catch {
        return false;
      }
    });

    const external = cache.links.filter((a) => {
      try {
        return new URL(a.href, location.href).hostname !== cache.hostname;
      } catch {
        return false;
      }
    });

    const brokenAnchors = cache.links.filter(
      (a) => !a.href || a.href === "#" || a.href.startsWith("javascript:")
    );

    const warnings: string[] = [];
    if (internal.length === 0) warnings.push("No internal links");
    if (brokenAnchors.length > 0)
      warnings.push(`${brokenAnchors.length} broken links`);

    if (warnings.length > 0) {
      return { status: "warning", message: warnings.join("; ") };
    }

    return {
      status: "success",
      message: `Internal: ${internal.length}, External: ${external.length}`,
    };
  })();

  checks.externalLinksSecurity = ((): SeoCheckResult => {
    const external = cache.links.filter((a) => {
      try {
        return new URL(a.href, location.href).hostname !== cache.hostname;
      } catch {
        return false;
      }
    });

    if (external.length === 0) {
      return { status: "success", message: "No external links" };
    }

    const unsecure = external.filter(
      (a) =>
        a.target === "_blank" &&
        (!a.rel.includes("noopener") || !a.rel.includes("noreferrer"))
    );

    if (unsecure.length > 0) {
      return {
        status: "info",
        message: `${unsecure.length} missing noopener/noreferrer (security)`,
      };
    }

    return {
      status: "info",
      message: `${external.length} secure external links`,
    };
  })();

  // 8. INTERNATIONALIZATION
  checks.hreflang = ((): SeoCheckResult => {
    if (cache.hreflangLinks.length === 0) {
      return { status: "success", message: "Monolingual (no hreflang needed)" };
    }

    const selfReferencing = cache.hreflangLinks.some((link) => {
      try {
        return new URL(link.href).pathname === location.pathname;
      } catch {
        return false;
      }
    });

    const hasXDefault = cache.hreflangLinks.some(
      (link) => link.getAttribute("hreflang") === "x-default"
    );

    const warnings: string[] = [];
    if (!selfReferencing) warnings.push("Missing self-referencing hreflang");
    if (!hasXDefault && cache.hreflangLinks.length > 1)
      warnings.push("Missing x-default");

    if (warnings.length > 0) {
      return { status: "warning", message: warnings.join("; ") };
    }

    return {
      status: "success",
      message: `${cache.hreflangLinks.length} hreflang tags`,
    };
  })();

  // 9. OPEN GRAPH
  checks.ogTitle = ((): SeoCheckResult => {
    if (!cache.ogTitle?.content) {
      return { status: "warning", message: "Missing og:title" };
    }
    return { status: "success", message: cache.ogTitle.content.slice(0, 60) };
  })();

  checks.ogDescription = ((): SeoCheckResult => {
    if (!cache.ogDescription?.content) {
      return { status: "warning", message: "Missing og:description" };
    }
    const content = cache.ogDescription.content;
    if (content.length < 50) {
      return {
        status: "warning",
        message: `Too short: ${content.length} chars`,
      };
    }
    return {
      status: "success",
      message: content.slice(0, SEO_RULES.OG_PREVIEW_LENGTH),
    };
  })();

  checks.ogImage = ((): SeoCheckResult => {
    if (!cache.ogImage?.content) {
      return { status: "warning", message: "Missing og:image" };
    }

    try {
      const url = new URL(cache.ogImage.content, location.href);
      if (url.protocol !== "https:") {
        return { status: "warning", message: "og:image should use HTTPS" };
      }
      return { status: "success", message: cache.ogImage.content };
    } catch {
      return { status: "error", message: "Invalid og:image URL" };
    }
  })();

  checks.ogType = ((): SeoCheckResult => {
    if (!cache.ogType?.content) {
      return { status: "warning", message: "Missing og:type" };
    }

    const validTypes = [
      "website",
      "article",
      "product",
      "video.movie",
      "music.song",
      "book",
    ];
    const type = cache.ogType.content;

    if (!validTypes.includes(type)) {
      return { status: "warning", message: `Non-standard type: ${type}` };
    }

    return { status: "success", message: `Type: ${type}` };
  })();

  checks.ogUrl = ((): SeoCheckResult => {
    const ogUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]'
    );
    if (!ogUrl?.content) {
      return { status: "warning", message: "Missing og:url" };
    }

    const isLocalhost =
      cache.hostname === "localhost" || cache.hostname === "127.0.0.1";
    const canonical = cache.canonical?.href;

    if (canonical && !isLocalhost && ogUrl.content !== canonical) {
      return { status: "warning", message: "og:url differs from canonical" };
    }

    try {
      const url = new URL(ogUrl.content);
      if (!isLocalhost && url.protocol !== "https:") {
        return { status: "warning", message: "og:url should use HTTPS" };
      }
    } catch {
      return { status: "error", message: "Invalid og:url" };
    }

    return { status: "success", message: "Consistent with canonical" };
  })();

  checks.ogSiteName = ((): SeoCheckResult => {
    const ogSiteName = document.querySelector<HTMLMetaElement>(
      'meta[property="og:site_name"]'
    );
    if (!ogSiteName?.content) {
      return { status: "warning", message: "Missing og:site_name" };
    }
    return { status: "success", message: ogSiteName.content };
  })();

  checks.ogLocale = ((): SeoCheckResult => {
    const ogLocale = document.querySelector<HTMLMetaElement>(
      'meta[property="og:locale"]'
    );
    const htmlLang = cache.docElement.lang;

    if (!ogLocale?.content) {
      return { status: "warning", message: "Missing og:locale" };
    }

    const locale = ogLocale.content;
    if (
      htmlLang &&
      !locale.toLowerCase().startsWith(htmlLang.toLowerCase().split("-")[0])
    ) {
      return {
        status: "warning",
        message: `Inconsistent with lang="${htmlLang}"`,
      };
    }

    return { status: "success", message: locale };
  })();

  // 10. TWITTER CARDS
  checks.twitterCard = ((): SeoCheckResult => {
    const twitterCard = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:card"]'
    );
    const twitterSite = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:site"]'
    );

    if (!twitterCard?.content) {
      return { status: "warning", message: "Missing Twitter Card" };
    }

    const validCards = ["summary", "summary_large_image", "app", "player"];
    const cardType = twitterCard.content;

    if (!validCards.includes(cardType)) {
      return { status: "warning", message: `Invalid card type: ${cardType}` };
    }

    return {
      status: "success",
      message: `${cardType}${twitterSite?.content ? ` @${twitterSite.content}` : ""}`,
    };
  })();

  checks.twitterImage = ((): SeoCheckResult => {
    const twitterImage = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:image"]'
    );
    if (!twitterImage?.content) {
      return { status: "success", message: "Fallback to og:image" };
    }

    try {
      const url = new URL(twitterImage.content, location.href);
      if (url.protocol !== "https:") {
        return { status: "warning", message: "twitter:image should use HTTPS" };
      }
    } catch {
      return { status: "error", message: "Invalid twitter:image URL" };
    }

    return { status: "success", message: "Twitter image defined" };
  })();

  // 11. STRUCTURED DATA
  checks.structuredData = ((): SeoCheckResult => {
    if (cache.schemas.length === 0) {
      return {
        status: "info",
        message: "No structured data (Schema.org recommended)",
      };
    }

    let validSchemas = 0;
    let invalidSchemas = 0;

    cache.schemas.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || "");
        if (json["@context"] && json["@type"]) {
          validSchemas++;
        } else {
          invalidSchemas++;
        }
      } catch {
        invalidSchemas++;
      }
    });

    if (invalidSchemas > 0) {
      return {
        status: "warning",
        message: `${validSchemas} valid, ${invalidSchemas} invalid`,
      };
    }

    return {
      status: "success",
      message: `${validSchemas} valid JSON-LD schema(s)`,
    };
  })();

  checks.schemaOrganization = ((): SeoCheckResult => {
    let hasOrganization = false;

    cache.schemas.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || "");
        if (
          json["@type"] === "Organization" ||
          json["@type"] === "LocalBusiness"
        ) {
          hasOrganization = true;
        }
      } catch {
        // Ignore parsing errors
      }
    });

    if (!hasOrganization) {
      return { status: "info", message: "Consider adding Organization schema" };
    }

    return { status: "info", message: "Organization schema present" };
  })();

  checks.breadcrumbSchema = ((): SeoCheckResult => {
    let hasBreadcrumb = false;

    cache.schemas.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || "");
        if (json["@type"] === "BreadcrumbList") {
          hasBreadcrumb = true;
        }
      } catch {
        // Ignore parsing errors
      }
    });

    if (!hasBreadcrumb) {
      return {
        status: "info",
        message: "Consider adding BreadcrumbList schema",
      };
    }

    return { status: "info", message: "Breadcrumb schema present" };
  })();

  checks.schemaArticle = ((): SeoCheckResult => {
    if (!isArticlePage()) {
      return { status: "success", message: "N/A (non-article page)" };
    }

    let hasArticle = false;
    cache.schemas.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || "");
        if (
          ["Article", "BlogPosting", "NewsArticle", "TechArticle"].includes(
            json["@type"]
          )
        ) {
          hasArticle = true;
        }
      } catch {
        // Ignore parsing errors
      }
    });

    if (!hasArticle) {
      return {
        status: "warning",
        message: "Missing Article schema (og:type=article)",
      };
    }

    return { status: "success", message: "Article schema present" };
  })();

  checks.schemaProduct = ((): SeoCheckResult => {
    if (!isProductPage()) {
      return { status: "success", message: "N/A (non-product page)" };
    }

    let hasProduct = false;
    cache.schemas.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || "");
        if (json["@type"] === "Product" || json["@type"] === "Offer") {
          hasProduct = true;
        }
      } catch {
        // Ignore parsing errors
      }
    });

    if (!hasProduct) {
      return {
        status: "warning",
        message: "Missing Product schema (og:type=product)",
      };
    }

    return { status: "success", message: "Product schema present" };
  })();

  checks.schemaFAQ = ((): SeoCheckResult => {
    let hasFAQ = false;

    cache.schemas.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || "");
        if (json["@type"] === "FAQPage") {
          hasFAQ = true;
        }
      } catch {
        // Ignore parsing errors
      }
    });

    const bodyText = cache.body.textContent?.toLowerCase() || "";
    const hasFAQContent =
      /\b(faq|questions? (fréquentes?|frequently asked))\b/i.test(bodyText);

    if (hasFAQContent && !hasFAQ) {
      return {
        status: "warning",
        message: "FAQ content detected (add FAQ schema)",
      };
    }

    return {
      status: "success",
      message: hasFAQ ? "FAQ schema present" : "N/A",
    };
  })();

  // 12. PERFORMANCE
  checks.criticalResources = ((): SeoCheckResult => {
    const criticalCSS = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
    ).filter(
      (link) =>
        !link.hasAttribute("media") || link.getAttribute("media") === "all"
    );

    const renderBlockingScripts = cache.scripts.filter(
      (script) => !script.hasAttribute("async") && !script.hasAttribute("defer")
    );

    const warnings: string[] = [];

    if (criticalCSS.length > SEO_RULES.RESOURCES_MAX_CSS_SCRIPTS)
      warnings.push(`${criticalCSS.length} render-blocking CSS`);
    if (renderBlockingScripts.length > SEO_RULES.RESOURCES_MAX_BLOCKING_SCRIPTS)
      warnings.push(`${renderBlockingScripts.length} render-blocking scripts`);

    if (warnings.length > 0) {
      return { status: "warning", message: warnings.join("; ") };
    }

    return { status: "success", message: "Critical resources optimized" };
  })();

  checks.resourceHints = ((): SeoCheckResult => {
    const preconnect = document.querySelectorAll('link[rel="preconnect"]');
    const dnsPrefetch = document.querySelectorAll('link[rel="dns-prefetch"]');
    const preload = document.querySelectorAll('link[rel="preload"]');

    if (preload.length > 5) {
      return {
        status: "warning",
        message: `Too many preloads: ${preload.length} (max 3-5)`,
      };
    }

    const totalHints = preconnect.length + dnsPrefetch.length + preload.length;

    if (totalHints === 0) {
      return {
        status: "info",
        message:
          "No resource hints found. Consider adding some to improve resource loading",
      };
    }

    return {
      status: "success",
      message: `${preconnect.length} preconnect, ${preload.length} preload`,
    };
  })();

  checks.inlineStyles = ((): SeoCheckResult => {
    const elementsWithStyle = document.querySelectorAll("[style]");
    const count = elementsWithStyle.length;

    if (count > 50) {
      return {
        status: "warning",
        message: `Excessive inline styles: ${count}`,
      };
    }

    return {
      status: "success",
      message: count === 0 ? "No inline styles" : `${count} inline styles`,
    };
  })();

  // 13. ANALYTICS & TRACKING
  checks.analyticsDetection = ((): SeoCheckResult => {
    const detected: string[] = [];

    if (document.querySelector('script[src*="googletagmanager.com/gtag"]'))
      detected.push("GA4");
    else if (
      document.querySelector(
        'script[src*="analytics.js"], script[src*="gtag/js"]'
      )
    )
      detected.push("GA");
    if (document.querySelector('meta[name="google-site-verification"]'))
      detected.push("Search Console");
    if (document.querySelector('script[src*="fbevents.js"]'))
      detected.push("Facebook Pixel");
    if (document.querySelector('script[src*="matomo"], script[src*="piwik"]'))
      detected.push("Matomo");

    if (detected.length === 0) {
      return { status: "info", message: "No analytics detected" };
    }

    return { status: "info", message: detected.join(", ") };
  })();

  checks.cookieConsent = ((): SeoCheckResult => {
    const cookieTools = [
      "cookiebot",
      "onetrust",
      "quantcast",
      "cookieconsent",
      "tarteaucitron",
      "axeptio",
      "cookiefirst",
      "nakas-cookies",
    ];
    const hasCookieConsent = cache.scripts.some((script) =>
      cookieTools.some((tool) => script.src.toLowerCase().includes(tool))
    );

    if (!hasCookieConsent) {
      return { status: "info", message: "No cookie consent (GDPR compliance)" };
    }

    return { status: "info", message: "Cookie consent detected !" };
  })();

  // 14. SECURITY
  checks.csp = ((): SeoCheckResult => {
    return {
      status: "info",
      message: "Configure CSP in next.config or meta tag",
    };
  })();

  checks.referrerPolicy = ((): SeoCheckResult => {
    return { status: "info", message: "Configure Referrer-Policy header" };
  })();

  // 15. ACCESSIBILITY
  checks.formLabels = ((): SeoCheckResult => {
    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input:not([type="hidden"]), textarea, select'
    );
    if (inputs.length === 0) {
      return { status: "success", message: "No forms" };
    }

    const withoutLabel = Array.from(inputs).filter((input) => {
      const hasLabel =
        input.id && document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel =
        input.hasAttribute("aria-label") ||
        input.hasAttribute("aria-labelledby");
      return !hasLabel && !hasAriaLabel;
    });

    if (withoutLabel.length > 0) {
      return {
        status: "warning",
        message: `${withoutLabel.length}/${inputs.length} fields without labels`,
      };
    }

    return { status: "success", message: `${inputs.length} labeled fields` };
  })();

  checks.ariaLandmarks = ((): SeoCheckResult => {
    const landmarks = document.querySelectorAll(
      '[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]'
    );
    const semanticLandmarks = document.querySelectorAll(
      "main, nav, header, footer"
    );
    const total = landmarks.length + semanticLandmarks.length;

    if (total === 0) {
      return { status: "warning", message: "No ARIA/semantic landmarks" };
    }

    return { status: "success", message: `${total} landmarks` };
  })();

  // 16. MOBILE
  checks.touchTargetSize = ((): SeoCheckResult => {
    const interactive = document.querySelectorAll<HTMLElement>(
      'a, button, input, select, textarea, [role="button"]'
    );
    if (interactive.length === 0) {
      return { status: "success", message: "No interactive elements" };
    }

    const tooSmall = Array.from(interactive).filter((el) => {
      const rect = el.getBoundingClientRect();
      return (
        (rect.width > 0 && rect.width < 44) ||
        (rect.height > 0 && rect.height < 44)
      );
    });

    if (tooSmall.length > interactive.length * 0.3) {
      return {
        status: "warning",
        message: `${tooSmall.length}/${interactive.length} targets < 44px`,
      };
    }

    return { status: "success", message: "Touch targets ≥44px" };
  })();

  checks.fontSizeReadability = ((): SeoCheckResult => {
    if (!cache.mainContent) {
      return { status: "error", message: 'Missing <main id="main-content">' };
    }

    const paragraphs =
      cache.mainContent.querySelectorAll<HTMLParagraphElement>("p");
    if (paragraphs.length === 0) {
      return { status: "success", message: "No paragraphs" };
    }

    const tooSmall = Array.from(paragraphs).filter((p) => {
      const fontSize = parseFloat(window.getComputedStyle(p).fontSize);
      return fontSize < 16;
    });

    if (tooSmall.length > paragraphs.length * 0.5) {
      return {
        status: "warning",
        message: `${tooSmall.length}/${paragraphs.length} paragraphs < 16px`,
      };
    }

    return { status: "success", message: "Font size ≥16px" };
  })();

  // Calculate score
  const allResults = Object.values(checks);
  const successCount = allResults.filter((r) => r.status === "success").length;
  const totalCount = allResults.filter((r) => r.status !== "info").length;

  return {
    checks,
    score: successCount,
    total: totalCount,
  };
}
