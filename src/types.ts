export type SeoCheckResult = {
  status: SeoStatus;
  message: string;
};

export type SeoStatus = "success" | "warning" | "error" | "info";

export type SeoAuditResult = {
  checks: Record<string, SeoCheckResult>;
  score: number;
  total: number;
};

export type SeoMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?:
    | "website"
    | "article"
    | "product"
    | "video.movie"
    | "music.song"
    | "book";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};
