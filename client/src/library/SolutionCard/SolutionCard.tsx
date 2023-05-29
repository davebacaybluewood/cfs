import { Container, Grid, Typography } from "@mui/material";
import React from "react";

import "./SolutionCard.scss";

interface SolutionCardProps {
  title: string;
  subtitle: string | JSX.Element;
  description: string | JSX.Element;
}
const SolutionCard: React.FC<SolutionCardProps> = (props) => {
  return (
    <div className="solution-card">
      <div className="card-title">
        <Typography variant="h3">{props.title}</Typography>
      </div>
      <div className="card-subtitle">
        <Typography variant="h4">{props.subtitle}</Typography>
      </div>
      <div className="card-description">
        <Typography>{props.description}</Typography>
      </div>
    </div>
  );
};

export default SolutionCard;
