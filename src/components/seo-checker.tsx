"use client";

import { useState } from "react";

import SEOCheckerHeader from "./seo-checker-header.js";
import SEOCheckList from "./seo-checklist.js";
import { useSeoAudit } from "../hooks/use-seo-audit.js";

const OPEN_KEY = "seo-gk-checker-open";

const SeoChecker = (): React.ReactElement | null => {
    const audit = useSeoAudit();
    const [open, setOpen] = useState(() => {
        if (typeof window === "undefined") return true;
        const stored = localStorage.getItem(OPEN_KEY);
        return stored === null ? true : stored === "true";
    });

    if (!audit) return null;

    const percentage = Math.round((audit.score / audit.total) * 100);

    return (
        <div id="seo-gk">
            {open ? (
                <>
                    <SEOCheckerHeader
                        percentage={percentage}
                        score={audit.score}
                        total={audit.total}
                        onClose={() => {
                            setOpen(false);
                            localStorage.setItem(OPEN_KEY, "false");
                        }}
                    />

                    <SEOCheckList checks={audit.checks} />
                </>
            ) : (
                <button
                    onClick={() => {
                        setOpen(true);
                        localStorage.setItem(OPEN_KEY, "true");
                    }}
                    id="seo-gk-button"
                >
                    <p className="seo-gk-button-text" style={{ color: "#000" }}>
                        {percentage}% of SEO compliance
                    </p>

                    <svg
                        className="seo-gk-button-icon lucide lucide-eye-icon lucide-eye"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SeoChecker;
