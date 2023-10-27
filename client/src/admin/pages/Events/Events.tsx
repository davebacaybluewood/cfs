import { Button } from "@mui/material";
import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import { formatISODateToDate } from "helpers/dateFormatter";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEvent, listEvents } from "redux/actions/eventActions";
import { CrumbTypes } from "../Dashboard/types";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Events",
    url: paths.newAdminEvents,
    isActive: true,
  },
];

const Events: React.FC = () => {
  const currentTimestamp = Date.now();
  const formattedDate = new Date(currentTimestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      className="admin-events"
    >
      <h2 className="centered-heading">Event Updated {formattedDate}</h2>
    </Wrapper>
  );
};

export default memo(Events);
