import React from "react";
import "./Headline.scss";
import { Container, Grid, TextField } from "@mui/material";

const Headline: React.FC = () => {
  return (
    <div className="headline-blogs">
      <div className="headline-title">
        <h3>Get in touch with us</h3>
      </div>
      <div className="headline-captions">
        <p>
          If you need our help, have questions about how to start with insurance
          or are <br /> experiencing technical difficulties, please do not
          hesitate to contact us.
        </p>
      </div>
    </div>
  );
};

export default Headline;
