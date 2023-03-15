import paths from "constants/routes";
import React from "react";
import useFetchWebinars from "../../FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import "../style.scss";
import WebinarList from "../components/WebinarList";

const CFSWebinars: React.FC = () => {
  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "CFS Webinars",
      url: paths.cfsWebinars,
      isActive: true,
    },
  ];

  const { loading, webinars } = useFetchWebinars();

  let title = "CFS Webinars";
  let subtitle = "Manage all CFS webinars.";

  return (
    <WebinarList {...{ webinars, breadcrumb, loading, title, subtitle }} />
  );
};

export default CFSWebinars;
