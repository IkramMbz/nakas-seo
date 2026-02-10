"use client";

import { Eye } from "lucide-react";
import { BodyText } from "nakas-ui";
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
          <BodyText className="seo-button-text" size="xs" color="#000">
            {percentage}% of SEO compliance
          </BodyText>
          <Eye size={16} className="seo-button-icon" />
        </button>
      )}
    </div>
  );
};

export default SeoChecker;
