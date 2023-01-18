import { Breadcrumbs, Link, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Breadcrumb.scss";

type BreadcrumbProps = {
  isVisible?: boolean;
  crumbs: {
    title: string;
    url?: string;
    isActive?: boolean;
  }[];
};
const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const navigate = useNavigate();
  if (!props.isVisible) {
    return <React.Fragment />;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-container">
      {props.crumbs.map((crumb, index) => {
        const crumbClassnames = classNames({
          "crumb-active": crumb.isActive,
        });
        return (
          <Typography
            color="text.primary"
            key={index}
            className={crumbClassnames}
            onClick={() => navigate(crumb.url as any)}
          >
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
