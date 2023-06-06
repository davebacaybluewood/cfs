import { Typography } from "@mui/material";
import React from "react";
import "./Subscription.scss";
import { Container } from "@mui/system";

const Subscription: React.FC = () => {
  return (
    <div className="subscription">
      <Container>
        <div className="subscription__content">
          <div className="form">
            <Typography variant="h4">
              Get free resources and get the latest <br /> updates. Subscribe to
              our newsletter.
            </Typography>
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
          <div className="logo">
            <img src="\assets\images\logos\logo-white.png" alt="CFS logo" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subscription;
