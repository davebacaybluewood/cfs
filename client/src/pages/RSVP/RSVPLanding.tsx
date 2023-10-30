import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import "./RSVPForm.scss";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import RSVPTable from "./RSVPTable";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Event Name",
    url: paths.rewardsHistory,
    isActive: true,
  },
  {
    title: "RSVP List",
    url: paths.rsvpLanding,
    isActive: true,
  },
];

const RSVPLanding: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <div className="rewards-history-container">
        <Title title="RSVP" subtitle="List of all rsvp submits" />
        <div className="rewards-history-table">
          <RSVPTable />
        </div>
      </div>
    </Wrapper>
  );
};

export default RSVPLanding;
