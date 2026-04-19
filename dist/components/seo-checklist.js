import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/index.css";
const StatusIcon = ({ status }) => {
    if (status === "success")
        return _jsxs("svg", { className: "icon nakas-seo-text-success lucide lucide-badge-check-icon lucide-badge-check", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [_jsx("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }), _jsx("path", { d: "m9 12 2 2 4-4" })] });
    if (status === "warning")
        return _jsxs("svg", { className: "icon nakas-seo-text-warning lucide lucide-circle-alert-icon lucide-circle-alert", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "12", x2: "12", y1: "8", y2: "12" }), _jsx("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })] });
    if (status === "error")
        return _jsxs("svg", { className: "icon nakas-seo-text-error lucide lucide-circle-x-icon lucide-circle-x", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "m15 9-6 6" }), _jsx("path", { d: "m9 9 6 6" })] });
    return _jsxs("svg", { className: "icon nakas-seo-text-info lucide lucide-badge-info-icon lucide-badge-info", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [_jsx("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }), _jsx("line", { x1: "12", x2: "12", y1: "16", y2: "12" }), _jsx("line", { x1: "12", x2: "12.01", y1: "8", y2: "8" })] });
};
const formatLabel = (text) => text.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
const SEOCheckList = ({ checks }) => {
    return (_jsx("div", { className: "nakas-seo-checklist", children: Object.entries(checks).map(([key, value]) => {
            // const borderColors: Record<SeoStatus, string> = {
            //   success: "border-green-500",
            //   warning: "border-orange-500",
            //   error: "border-red-500",
            //   info: "border-blue-500",
            // };
            const status = value.status;
            return (_jsxs("div", { className: "nakas-seo-checklist-item", children: [_jsx(StatusIcon, { status: status }), _jsxs("div", { children: [_jsx("p", { className: "title", children: formatLabel(key) }), _jsx("p", { className: "subtitle", style: { color: "var(--color-text-color)" }, children: value.message })] })] }, key));
        }) }));
};
export default SEOCheckList;
//# sourceMappingURL=seo-checklist.js.map