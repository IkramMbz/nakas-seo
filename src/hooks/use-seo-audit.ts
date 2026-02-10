"use client";

import { useEffect, useState } from "react";

import { runSeoAudit } from "../seo.engine.js";
import { SeoAuditResult } from "../types.js";

function isDev(): boolean {
  // Node.js / Next.js
  if (typeof process !== "undefined" && process.env?.NODE_ENV) {
    return process.env.NODE_ENV === "development";
  }

  // Vite / TanStack
  if (
    typeof import.meta !== "undefined" &&
    (import.meta as { env?: { DEV?: boolean } }).env
  ) {
    return Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);
  }

  return false;
}

const AUDIT_INTERVAL: number = 3000;

export function useSeoAudit(): SeoAuditResult | null {
  const [audit, setAudit] = useState<SeoAuditResult | null>(null);

  useEffect(() => {
    if (!isDev()) return;

    const execute = (): void => setAudit(runSeoAudit());

    execute();

    const interval = setInterval(execute, AUDIT_INTERVAL);

    return (): void => clearInterval(interval);
  }, []);

  return audit;
}
