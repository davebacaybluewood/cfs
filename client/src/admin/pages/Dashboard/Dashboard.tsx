import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import React, { useContext, useState } from "react";
import { CrumbTypes } from "./types";
import ConditionalBox from "./components/ConditionalBox/ConditionalBox";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import "./Dashboard.scss";
import { PopupModal, PopupWidget } from "react-calendly";

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

const Dashboard: React.FC = () => {
  const userCtx = useContext(UserContext) as any;
  const { profile } = useFetchUserProfile(userCtx?.user?.userGuid ?? "");
  const USER_POSITION = profile?.position;
  const USER_ROLE = profile?.roles;

  const [showCalendly, setShowCalendly] = useState(true);

  return (
    <Wrapper breadcrumb={crumbs} className="dashboard-content">
      <ConditionalBox position={USER_POSITION} roles={USER_ROLE} />
      <PopupModal
        url="https://calendly.com/gocfs/initial-bop-to-existing-agents-in-preparation-of-launching"
        onModalClose={() => setShowCalendly((prevState) => !prevState)}
        open={showCalendly}
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById("root") as any}
      />
    </Wrapper>
  );
};

export default Dashboard;
