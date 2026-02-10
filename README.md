![](/assets/media/img/logo.png)

# Nakas SEO

[![Release v0.1.0](https://img.shields.io/badge/release-v0.1.0-white)](https://github.com/IkramMbz/nakas-seo/blob/main/README.md#installation) [![Nakas Suite](assets/media/img/nakas-suite.svg)](https://mbechezi.fr/#nakas-suite) [![License](assets/media/img/license-mit.svg)](https://github.com/IkramMbz/nakas-seo/blob/main/LICENSE) [![Node.js](assets/media/img/nodejs.svg)](https://nodejs.org/) [![TypeScript](assets/media/img/typescript.svg)](https://www.typescriptlang.org/) [![Frontend Next](assets/media/img/nextjs.svg)](https://nextjs.org/) [![Frontend React](assets/media/img/react.svg)](https://reactjs.org/)

**Nakas SEO** is a lightweight React library that provides real-time SEO auditing and optimization tools for your web applications. It automatically analyzes your pages and displays actionable insights to improve your search engine rankings.

🟠**Note:** Nakas SEO is currently in the testing phase and is not yet available on npm. It will be released soon.

## Table of Contents
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- Real-time SEO audit with live feedback (development mode only)
- Comprehensive checks covering 50+ SEO best practices
- Structured data (Schema.org) validation
- Performance hints (critical resources, resource hints)
- Mobile-friendly and accessibility checks

## Installation

To use Nakas SEO in your project, your environment must meet the following minimum requirements:

- **Node.js** ≥ 18 (for full ESM support and modern module resolution)  
- **Package Manager:** `pnpm` ≥ 7 (or `npm` / `yarn`, scripts are tested with pnpm)

Initialize your project if you haven't already:
```bash
npm init -y
```

Then install the library directly from GitHub (since it's not yet published on npm):
```bash
npm install https://github.com/IkramMbz/nakas-seo
```

## Usage

### Basic Setup (React/Next.js Client Component)

Import the SEO checker component into your React/Next.js project:
```tsx
import SeoChecker from "nakas-seo";

export default function App() {
    return (
        <div>
            <SeoChecker />
            {/* Your app content */}
        </div>
    );
}
```

The `SeoChecker` component will automatically appear in development mode, displaying a floating widget with your SEO score and detailed audit results.

### Next.js Metadata Generation (App Router)

Before generating metadata, you need to initialize the SEO configuration in your layout file (or whichever file acts as the main layout):

```typescript
import { initSeoConfig } from "nakas-seo";

initSeoConfig({
    siteName: "Example Site",
    siteFullName: "Example Site - Your AI Assistant",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteLang: "en",
    siteLocale: "en_US",
    titleSeparator: "|",

    defaultOgImage: "/assets/images/default-og.png",
    defaultOgImageWidth: 1200,
    defaultOgImageHeight: 630,
    defaultOgImageAlt: "Example Site AI Preview",
    defaultOgImageType: "image/png",

    icons: {
        favicon: "/assets/images/favicon-32x32.png",
        appleTouchIcon: "/assets/images/apple-180x180.png",
        shortcut: "/assets/images/favicon-32x32.png",
        other: [
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-48x48.png", color: "#000000" },
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-72x72.png", color: "#000000" },
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-128x128.png", color: "#000000" },
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-192x192.png", color: "#000000" },
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-256x256.png", color: "#000000" },
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-384x384.png", color: "#000000" },
            { rel: "mask-icon", url: "/assets/media/img/manifest/maskable-icon-512x512.png", color: "#000000" }
        ]
    },

    manifest: "/manifest.json"
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
```

After initialization, you can use the metadata builder in your page files:

```typescript
import { buildNextMetadata } from "nakas-seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildNextMetadata({
    title: "My Page Title",
    description: "A comprehensive description of my page",
    canonical: "/my-page",
    image: "/images/og-image.jpg",
    imageAlt: "Page preview image",
    type: "article",
    locale: "en_US",
    publishedTime: "2025-01-15T10:00:00Z",
    author: "John Doe",
    keywords: ["SEO", "optimization", "Next.js"],
});
```

## Contributing

Components and features are actively developed and may change. Community contributions will be welcomed in the future.

## License

Nakas SEO is licensed under the [MIT License](https://github.com/IkramMbz/nakas-seo/blob/main/LICENSE).