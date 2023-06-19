import React from "react";
import { Container } from "@mui/material";
import { InlineWidget } from "react-calendly";
import "./CalendlySection.scss";
import { useMediaQuery } from "react-responsive";

const CalendlySection: React.FC = () => {
  const isCalendlyBreak = useMediaQuery({
    query: `(max-width: 1148px)`,
  });
  return (
    <div className="calendly-section">
      <Container>
        <div className="calendly-section-captions">
          <h2>Got Questions? Talk to us!</h2>
          <p>OR DIRECT CALL TO +1 (702) 900-5666</p>
        </div>
        <InlineWidget
          url="https://calendly.com/gocfs/30min"
          styles={{
            height: isCalendlyBreak ? "1000px" : "800px",
            marginTop: "-6rem",
            marginBottom: "-6rem",
          }}
        />
      </Container>
    </div>
  );
};

export default CalendlySection;
