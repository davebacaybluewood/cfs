import React from "react";
import { Grid, Typography } from "@mui/material";

import Button from "../../../../library/Button/Button";
import classNames from "classnames";
import "./InquiryCard.scss";

interface InquiryCardProps {
  header: string | JSX.Element;
  description: string | JSX.Element;
  image: string;
  align: "left" | "right";
  color: "navy" | "blue" | "red";
  buttonConfigs?: {
    text: string;
    onClick?: () => void;
  };
}

const InquiryCard: React.FC<InquiryCardProps> = (props) => {
  const cardClassnames = classNames({
    "inquiry-card-container": true,
    "color-navy": props.color === "navy",
    "color-blue": props.color === "blue",
    "color-red": props.color === "red",
  });
  return (
    <div className={cardClassnames}>
      <Grid
        container
        alignItems="center"
        direction={props.align === "left" ? "row-reverse" : undefined}
      >
        <Grid item sm={12} md={6} lg={6}>
          <div className="inquiry-card-content">
            <Typography variant="h3">{props.header}</Typography>
            <p>{props.description}</p>
            {props.buttonConfigs?.text ? (
              <Button onClick={props.buttonConfigs.onClick}>
                {props.buttonConfigs.text}
              </Button>
            ) : null}
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <img src={props.image} alt={props.image} />
        </Grid>
      </Grid>
    </div>
  );
};

export default InquiryCard;
