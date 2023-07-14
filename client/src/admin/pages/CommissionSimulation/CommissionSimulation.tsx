import React, { useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { Alert, AlertTitle, Grid } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import "./CommissionSimulation.scss";
import Graph from "./components/Graph";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import Button from "library/Button/Button";
import { BigBadgeProps } from "admin/components/BigBadge/BigBadge";
import formatter from "helpers/currencyFormatter";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import AlertMessage from "library/AlertMessage/Alert";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Commission Simulation",
    url: paths.commissionSimulation,
    isActive: true,
  },
];

const standardInputStyles = {
  fontSize: "16px",
};
const CommissionSimulation: React.FC = () => {
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="commision-simulation-container"
    >
      <Title
        title="Commission Simulation"
        subtitle="Compute your commission."
      />
    </Wrapper>
  );
};

export default CommissionSimulation;
