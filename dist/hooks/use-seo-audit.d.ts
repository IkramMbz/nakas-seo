import type { SeoAuditResult } from "../types.js";
declare global {
    interface ImportMetaEnv {
        readonly DEV?: boolean;
    }
    interface ImportMeta {
        readonly env?: ImportMetaEnv;
    }
}
export declare function useSeoAudit(): SeoAuditResult | null;
//# sourceMappingURL=use-seo-audit.d.ts.map