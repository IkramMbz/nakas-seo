"use client";
import { useEffect, useState } from "react";
import { runSeoAudit } from "../seo.engine.js";
function isDev() {
    // Node.js / Next.js
    if (typeof process !== "undefined" && process.env?.NODE_ENV) {
        return process.env.NODE_ENV === "development";
    }
    // Vite / TanStack
    if (typeof import.meta !== "undefined" &&
        import.meta.env) {
        return Boolean(import.meta.env?.DEV);
    }
    return false;
}
const AUDIT_INTERVAL = 3000;
export function useSeoAudit() {
    const [audit, setAudit] = useState(null);
    useEffect(() => {
        if (!isDev())
            return;
        const execute = () => setAudit(runSeoAudit());
        execute();
        const interval = setInterval(execute, AUDIT_INTERVAL);
        return () => clearInterval(interval);
    }, []);
    return audit;
}
//# sourceMappingURL=use-seo-audit.js.map