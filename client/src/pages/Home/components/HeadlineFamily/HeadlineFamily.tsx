import Button from "../../../../library/Button/Button";
import { Typography } from "@mui/material";
import React from "react";

import "./HeadlineFamily.scss";

const HeadlineFamily: React.FC = () => {
  return (
    <div className="headline-family">
      <div className="captions">
        <Typography variant="h2">
          Financial Comfort, <br /> Now and Tomorrow
        </Typography>
        <div className="headline-home__btn">
          <Button variant="danger">Free Consultation</Button>
          <Button variant="default">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default HeadlineFamily;
