import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { USER_FAQ } from "../constants";

const SuccessPage: React.FC = () => {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="success-page">
      <img
        src="/assets/icons/success.svg"
        alt="success-indicator"
        className="success-image"
      />
      <h2>Agent Registration Success</h2>
      <p>
        Thank you for registering with Comfort Financial Solutions. <br /> It
        will take 3-5 business days to process your request.
      </p>

      <div className="faq-accordions">
        {USER_FAQ.map((data) => {
          return (
            <Accordion
              expanded={expanded === data.id}
              onChange={handleChange(data.id)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{data.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default SuccessPage;
