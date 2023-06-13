import React from "react";
import { FaAngleRight, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./DashboardCard.scss";

type DashboardCardProps = {
  count: number;
  countText: string;
  icon?: React.ReactNode;
  url: string;
};
const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  return (
    <div className="dashboard-card">
      <div className="card-container">
        <div className="card-captions">
          <h1>{props.count}</h1>
          <h5>{props.countText}</h5>
        </div>
        <div className="icon">
          <div className="icon-holder">{props.icon}</div>
        </div>
      </div>
      <Link to={props.url}>
        View All Information <FaAngleRight />
      </Link>
    </div>
  );
};

DashboardCard.defaultProps = {
  icon: <FaGlobe />,
};

export default DashboardCard;
