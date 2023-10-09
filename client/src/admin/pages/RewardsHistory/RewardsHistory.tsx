import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import { CrumbTypes } from "../Dashboard/types";
import Title from "admin/components/Title/Title";
import "./RewardsHistory.scss";
import RewardsHistoryTable from "./RewardsHistoryTable";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Rewards History",
    url: paths.rewardsHistory,
    isActive: true,
  },
];

const RewardsHistory: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <div className="rewards-history-container">
        <Title
          title="Rewards Points"
          subtitle="List of all rewards points earned"
        />
        <div className="rewards-history-table">
          <RewardsHistoryTable />
        </div>
      </div>
    </Wrapper>
  );
};

export default RewardsHistory;
