"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye } from "lucide-react";
import { BodyText } from "nakas-ui";
import { useState } from "react";
import SEOCheckerHeader from "./seo-checker-header.js";
import SEOCheckList from "./seo-checklist.js";
import { useSeoAudit } from "../hooks/use-seo-audit.js";
const SeoChecker = () => {
    const audit = useSeoAudit();
    const [open, setOpen] = useState(true);
    if (!audit)
        return null;
    const percentage = Math.round((audit.score / audit.total) * 100);
    return (_jsx("div", { className: "seo-checklist-wrapper", children: open ? (_jsxs("div", { className: "seo-checklist-panel", children: [_jsx(SEOCheckerHeader, { percentage: percentage, score: audit.score, total: audit.total, onClose: () => setOpen(false) }), _jsx(SEOCheckList, { checks: audit.checks })] })) : (_jsxs("button", { onClick: () => setOpen(true), className: "seo-button", children: [_jsxs(BodyText, { className: "seo-button-text", size: "xs", color: "#000", children: [percentage, "% of SEO compliance"] }), _jsx(Eye, { size: 16, className: "seo-button-icon" })] })) }));
};
export default SeoChecker;
//# sourceMappingURL=seo-checker.js.map