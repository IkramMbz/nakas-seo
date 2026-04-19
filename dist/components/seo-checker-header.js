import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const ERROR_COLOR = "rgb(239, 68, 68)";
const WARNING_COLOR = "rgb(249, 115, 22)";
const SUCCESS_COLOR = "rgb(46, 204, 113)";
const INFO_COLOR = "rgb(0, 123, 255)";
const BLACK_COLOR = "rgb(15,15,15)";
const status = [
    { id: "error", label: "Error", color: ERROR_COLOR },
    { id: "warning", label: "Warning", color: WARNING_COLOR },
    { id: "success", label: "Success", color: SUCCESS_COLOR },
    { id: "info", label: "Info", color: INFO_COLOR },
];
const SEOCheckerHeader = ({ percentage, score, total, onClose, }) => {
    let endColor = BLACK_COLOR;
    if (percentage < 60) {
        endColor = ERROR_COLOR;
    }
    else if (percentage < 80) {
        endColor = WARNING_COLOR;
    }
    else {
        endColor = SUCCESS_COLOR;
    }
    return (_jsxs("header", { className: "seo-checker-header", style: {
            background: `linear-gradient(to right, rgba(0,0,0,1) 30%, ${endColor})`,
        }, children: [_jsxs("div", { className: "seo-checker-header-top", children: [_jsxs("div", { children: [_jsxs("p", { style: { fontWeight: "bold" }, children: [percentage, "%"] }), _jsxs("p", { color: "#fff", children: [score, "/", total] })] }), _jsx("button", { onClick: onClose, className: "seo-checker-close", children: _jsxs("svg", { className: "lucide lucide-eye-off-icon lucide-eye-off", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [_jsx("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }), _jsx("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }), _jsx("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }), _jsx("path", { d: "m2 2 20 20" })] }) })] }), _jsx("div", { className: "seo-checker-status", children: status.map(({ label, id }) => (_jsxs("div", { className: "seo-checker-status-item", children: [_jsx("span", { className: `seo-checker-status-color seo-checker-status-${id}` }), label] }, label))) })] }));
};
export default SEOCheckerHeader;
//# sourceMappingURL=seo-checker-header.js.map