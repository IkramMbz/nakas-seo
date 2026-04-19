"use client";

import { useState } from "react";

import SEOCheckerHeader from "./seo-checker-header.js";
import SEOCheckList from "./seo-checklist.js";
import { useSeoAudit } from "../hooks/use-seo-audit.js";

const SeoChecker = (): React.ReactElement | null => {
  const audit = useSeoAudit();
  const [open, setOpen] = useState(true);

  if (!audit) return null;

  const percentage = Math.round((audit.score / audit.total) * 100);

  return (
    <div className="seo-checklist-wrapper">
      {open ? (
        <div className="seo-checklist-panel">
          <SEOCheckerHeader
            percentage={percentage}
            score={audit.score}
            total={audit.total}
            onClose={() => setOpen(false)}
          />

          <SEOCheckList checks={audit.checks} />
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="seo-button">
          <p className="seo-button-text" style={{ color: "#000" }}>
            {percentage}% of SEO compliance
          </p>

          <svg className="seo-button-icon lucide lucide-eye-icon lucide-eye" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
      )}
    </div>
  );
};

export default SeoChecker;
