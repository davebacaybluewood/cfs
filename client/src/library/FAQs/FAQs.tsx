import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FAQstype } from "./FAQsModel";
import "./FAQs.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";

interface FAQsProps {
  title: string;
  description?: string;
  faqs: FAQstype[];
  url: string;
}
const FAQs: React.FC<FAQsProps> = (props) => {
  const sliceFaqData = props.faqs.length / 2;
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);

  const search = useLocation().search;
  const isOpenConsultation1 = new URLSearchParams(search).get("consultation1");
  const isOpenConsultation2 = new URLSearchParams(search).get("consultation2");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpenConsultation1 || isOpenConsultation2) {
      setOpenCalendlyModal(true);
    }
  }, [isOpenConsultation1, isOpenConsultation2]);

  return (
    <div className="faqs">
      <Container>
        <div className="section__title">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={6}>
            {props.faqs.slice(0, sliceFaqData).map((faq) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
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
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Grid item sm={12} md={12} lg={6}>
            {props.faqs.slice(sliceFaqData, props.faqs.length).map((faq) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
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
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
      <PopupModal
        url={CALENDLY.CONSULTATION}
        onModalClose={() => {
          navigate(props.url);
          setOpenCalendlyModal(false);
        }}
        open={openCalendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </div>
  );
};

export default FAQs;
