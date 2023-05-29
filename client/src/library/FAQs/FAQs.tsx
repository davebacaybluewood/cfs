import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { FAQstype } from "./FAQsModel";

import "./FAQs.scss";

interface FAQsProps {
  title: string;
  faqs: FAQstype[];
}
const FAQs: React.FC<FAQsProps> = (props) => {
  return (
    <div className="faqs">
      <Container>
        <div className="section__title">
          <h3>{props.title}</h3>
        </div>
        {props.faqs.map((faq) => {
          return (
            <Accordion key={faq.id} className="accordion__container">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<FaAngleDown />}
              >
                <Typography variant="h4" className="faq__title">
                  {faq.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq__description" variant="h5">
                  {faq.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </div>
  );
};

export default FAQs;
