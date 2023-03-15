import paths from "constants/routes";
import React from "react";
import useFetchWebinars from "../../FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import "../style.scss";
import WebinarList from "../components/WebinarList";
import useFetchAgent from "AdminNew/pages/Agents/hooks/useFetchAgent";
import { NOTIFICATION_ENUMS } from "constants/constants";

const ActivatedWebinars: React.FC = () => {
  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Activated Webinars",
      url: paths.cfsWebinars,
      isActive: true,
    },
  ];

  const { loading, webinars } = useFetchWebinars();

  const agentStorage = localStorage.getItem("userInfo");
  const { userGuid } = JSON.parse(agentStorage ?? "");
  const agentInfo = useFetchAgent(userGuid?.toString());

  const agentWebinars = agentInfo.agent?.webinars
    ?.filter(
      (data: any) =>
        data.status === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED
    )
    ?.map((data: any) => {
      return data.webinarGuid;
    });

  const filteredWebinars = webinars?.filter((data: any) =>
    agentWebinars?.includes(data.webinarGuid)
  );

  let title = "Activated Webinars";
  let subtitle = "Manage all activated webinars.";

  return (
    <WebinarList
      {...{
        webinars: filteredWebinars,
        breadcrumb,
        loading: loading || agentInfo?.loading,
        title,
        subtitle,
      }}
    />
  );
};

export default ActivatedWebinars;
