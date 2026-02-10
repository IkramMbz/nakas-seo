import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, BadgeInfo, CheckCircle, XCircle } from "lucide-react";
import { BodyText } from "nakas-ui";
import "../styles/index.css";
const StatusIcon = ({ status }) => {
    if (status === "success")
        return _jsx(CheckCircle, { className: "icon nakas-seo-text-success", size: 16 });
    if (status === "warning")
        return _jsx(AlertCircle, { className: "icon nakas-seo-text-warning", size: 16 });
    if (status === "error")
        return _jsx(XCircle, { className: "icon nakas-seo-text-error", size: 20 });
    return _jsx(BadgeInfo, { className: "icon nakas-seo-text-info", size: 20 });
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
            return (_jsxs("div", { className: "nakas-seo-checklist-item", children: [_jsx(StatusIcon, { status: status }), _jsxs("div", { children: [_jsx(BodyText, { size: "sm", className: "title", color: "var(--color-bold-color)", children: formatLabel(key) }), _jsx(BodyText, { size: "xs", className: "subtitle", color: "var(--color-bold-color)", children: value.message })] })] }, key));
        }) }));
};
export default SEOCheckList;
//# sourceMappingURL=seo-checklist.js.map