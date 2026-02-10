import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { EyeOff } from "lucide-react";
import { BodyText } from "nakas-ui";
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
        }, children: [_jsxs("div", { className: "seo-checker-header-top", children: [_jsxs("div", { children: [_jsxs(BodyText, { color: "#fff", size: "xl", children: [percentage, "%"] }), _jsxs(BodyText, { color: "#fff", size: "md", children: [score, "/", total] })] }), _jsx("button", { onClick: onClose, className: "seo-checker-close", children: _jsx(EyeOff, { size: 24 }) })] }), _jsx("div", { className: "seo-checker-status", children: status.map(({ label, id }) => (_jsxs("div", { className: "seo-checker-status-item", children: [_jsx("span", { className: `seo-checker-status-color seo-checker-status-${id}` }), label] }, label))) })] }));
};
export default SEOCheckerHeader;
//# sourceMappingURL=seo-checker-header.js.map