"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "seo-checklist-wrapper", children: open ? (_jsxs("div", { className: "seo-checklist-panel", children: [_jsx(SEOCheckerHeader, { percentage: percentage, score: audit.score, total: audit.total, onClose: () => setOpen(false) }), _jsx(SEOCheckList, { checks: audit.checks })] })) : (_jsxs("button", { onClick: () => setOpen(true), className: "seo-button", children: [_jsxs("p", { className: "seo-button-text", style: { color: "#000" }, children: [percentage, "% of SEO compliance"] }), _jsxs("svg", { className: "seo-button-icon lucide lucide-eye-icon lucide-eye", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [_jsx("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }), _jsx("circle", { cx: "12", cy: "12", r: "3" })] })] })) }));
};
export default SeoChecker;
//# sourceMappingURL=seo-checker.js.map