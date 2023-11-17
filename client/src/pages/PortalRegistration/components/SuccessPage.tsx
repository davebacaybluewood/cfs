import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { USER_FAQ } from "../constants";
import "./components.scss";

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
      <h2 className="sucess-title">Agent Registration Success</h2>
      <p className="sucess-message">
        Thank you for signing up for our 30-day free trial! Keep an eye on your
        email for important updates about your registration. If you have any
        questions or need assistance, feel free to reach out
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
