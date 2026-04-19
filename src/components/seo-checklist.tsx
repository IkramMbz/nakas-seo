import "../styles/index.css";

import { SeoStatus } from "../types.js";

type Check = {
  status: SeoStatus;
  message: string;
};

const StatusIcon = ({ status }: { status: SeoStatus }): React.ReactElement => {
  if (status === "success")
    return <svg className="icon nakas-seo-text-success lucide lucide-badge-check-icon lucide-badge-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (status === "warning")
    return <svg className="icon nakas-seo-text-warning lucide lucide-circle-alert-icon lucide-circle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>;
  if (status === "error")
    return <svg className="icon nakas-seo-text-error lucide lucide-circle-x-icon lucide-circle-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>;
  return <svg className="icon nakas-seo-text-info lucide lucide-badge-info-icon lucide-badge-info" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" /></svg>;
};

type SeoCheckListProps = {
  checks: Record<string, Check>;
};

const formatLabel = (text: string): string =>
  text.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

const SEOCheckList = ({ checks }: SeoCheckListProps): React.ReactElement => {
  return (
    <div className="nakas-seo-checklist">
      {Object.entries(checks).map(([key, value]) => {
        // const borderColors: Record<SeoStatus, string> = {
        //   success: "border-green-500",
        //   warning: "border-orange-500",
        //   error: "border-red-500",
        //   info: "border-blue-500",
        // };

        const status: SeoStatus = value.status;

        return (
          <div key={key} className="nakas-seo-checklist-item">
            <StatusIcon status={status} />

            <div>
              <p
                className="title"
              >
                {formatLabel(key)}
              </p>
              <p
                className="subtitle"
                style={{ color: "var(--color-text-color)" }}
              >
                {value.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SEOCheckList;
