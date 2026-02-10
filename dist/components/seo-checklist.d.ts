import "../styles/index.css";
import { SeoStatus } from "../types.js";
type Check = {
    status: SeoStatus;
    message: string;
};
type SeoCheckListProps = {
    checks: Record<string, Check>;
};
declare const SEOCheckList: ({ checks }: SeoCheckListProps) => React.ReactElement;
export default SEOCheckList;
//# sourceMappingURL=seo-checklist.d.ts.map