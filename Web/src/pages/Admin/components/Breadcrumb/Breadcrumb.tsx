import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import "./Breadcrumb.scss";

type BreadcrumbProps = {
  isVisible?: boolean;
  crumbs: {
    title: string;
    link?: string;
  }[];
};
const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  if (!props.isVisible) {
    return <React.Fragment />;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-container">
      {props.crumbs.map((crumb, index) => {
        return (
          <Typography color="text.primary" key={index}>
            {crumb.title}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

Breadcrumb.defaultProps = {
  isVisible: true,
};

export default Breadcrumb;
