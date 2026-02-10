import { EyeOff } from "lucide-react";
import { BodyText } from "nakas-ui";

type SeoHeaderProps = {
  percentage: number;
  score: number;
  total: number;
  onClose: () => void;
};

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

const SEOCheckerHeader = ({
  percentage,
  score,
  total,
  onClose,
}: SeoHeaderProps): React.ReactElement => {
  let endColor = BLACK_COLOR;

  if (percentage < 60) {
    endColor = ERROR_COLOR;
  } else if (percentage < 80) {
    endColor = WARNING_COLOR;
  } else {
    endColor = SUCCESS_COLOR;
  }

  return (
    <header
      className="seo-checker-header"
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,1) 30%, ${endColor})`,
      }}
    >
      <div className="seo-checker-header-top">
        <div>
          <BodyText color="#fff" size="xl">
            {percentage}%
          </BodyText>
          <BodyText color="#fff" size="md">
            {score}/{total}
          </BodyText>
        </div>

        <button onClick={onClose} className="seo-checker-close">
          <EyeOff size={24} />
        </button>
      </div>

      <div className="seo-checker-status">
        {status.map(({ label, id }) => (
          <div key={label} className="seo-checker-status-item">
            <span
              className={`seo-checker-status-color seo-checker-status-${id}`}
            ></span>
            {label}
          </div>
        ))}
      </div>
    </header>
  );
};

export default SEOCheckerHeader;
