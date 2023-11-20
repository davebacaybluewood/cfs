import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import React, { useContext } from "react";
import { CrumbTypes } from "./types";
import ConditionalBox from "./components/ConditionalBox/ConditionalBox";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import "./Dashboard.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Dashboard",
    url: paths.dashboard,
    isActive: true,
  },
];

/**
 *
 * Calendly code will be removed on December.
 * The reason we retained this because we might need this feature now.
 */

const Dashboard: React.FC = () => {
  const userCtx = useContext(UserContext) as any;
  const { profile } = useFetchUserProfile(userCtx?.user?.userGuid ?? "");
  const USER_POSITION = profile?.position;
  const USER_ROLE = profile?.roles;

  // const [showCalendly, setShowCalendly] = useState(true);

  return (
    <Wrapper breadcrumb={crumbs} className="dashboard-content">
      <DocumentTitleSetter title="Dashboard | CFS Portal" />
      <ConditionalBox position={USER_POSITION} roles={USER_ROLE} />
      {/* <PopupModal
        url="https://calendly.com/gocfs/initial-bop-to-existing-agents-in-preparation-of-launching"
        onModalClose={() => setShowCalendly((prevState) => !prevState)}
        open={showCalendly}
        rootElement={document.getElementById("root") as any}
      /> */}
    </Wrapper>
  );
};

export default Dashboard;
