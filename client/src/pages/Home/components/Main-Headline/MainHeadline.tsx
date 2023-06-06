import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import "./MainHeadline.scss";

const MainHeadline: React.FC = () => {
  return (
    <div className="main-headline">
      <Container>
        <Typography variant="h3">
          Financial Comfort <br /> Now and Tomorrow.
        </Typography>
      </Container>
    </div>
  );
};

export default MainHeadline;
