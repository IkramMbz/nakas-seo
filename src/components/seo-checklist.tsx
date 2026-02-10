import { AlertCircle, BadgeInfo, CheckCircle, XCircle } from "lucide-react";
import { BodyText } from "nakas-ui";

import "../styles/index.css";

import { SeoStatus } from "../types.js";

type Check = {
  status: SeoStatus;
  message: string;
};

const StatusIcon = ({ status }: { status: SeoStatus }): React.ReactElement => {
  if (status === "success")
    return <CheckCircle className="icon nakas-seo-text-success" size={16} />;
  if (status === "warning")
    return <AlertCircle className="icon nakas-seo-text-warning" size={16} />;
  if (status === "error")
    return <XCircle className="icon nakas-seo-text-error" size={20} />;
  return <BadgeInfo className="icon nakas-seo-text-info" size={20} />;
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
              <BodyText
                size="sm"
                className="title"
                color="var(--color-bold-color)"
              >
                {formatLabel(key)}
              </BodyText>
              <BodyText
                size="xs"
                className="subtitle"
                color="var(--color-bold-color)"
              >
                {value.message}
              </BodyText>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SEOCheckList;
