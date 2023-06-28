import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ContactUs from "pages/ContactPage/components/ContactUs/ContactUs";
import HeaderTitle from "library/HeaderTitle/HeaderTitle";
import React, { useState } from "react";
import WorkingSteps from "./components/WorkingSteps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import useScroll from "hooks/useScroll";
import solutionData from "./data";
import PageTitle from "library/PageTitle/PageTitle";
import ReactHelmet from "react-helmet";
import "./Solutions.scss";
import Button from "library/Button/Button";

const workingSteps = [
  {
    title: "01",
    subTitle: "Pick a Date",
    description: "",
  },
  {
    title: "02",
    subTitle: "Select a Time",
    description: "",
  },
  {
    title: "03",
    subTitle: "Submit Appointment",
    description: "",
  },
  {
    title: "04",
    subTitle: "Get in touch!",
    description: "",
  },
];

const Solutions = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = useState(false);

  useScroll();
  const { id } = useParams();
  const [expanded, setExpanded] = useState(id);

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  const lifeInsuranceAccordions = solutionData.filter(
    (s) => s.type === "life-insurance"
  );
  const annuityAccordions = solutionData.filter((s) => s.type === "annuity");

  const metaKeywords = [
    "annuities rate",
    "annuities life insurance",
    "annuity for life insurance",
    "annuities interest rates",
  ].join(", ");

  const metaDatas = {
    metaKeywords,
    metaDescription:
      "Comfort Financial Solutions offers annuity, insurance, and financial security solutions to help you meet your goals and secure your financial future. Contact us today!",
  };

  return (
    <div className="services-content">
      <ReactHelmet>
        <title>
          Annuities and Life Insurance Products | Comfort Financial Solutions
        </title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={metaDatas.metaDescription} />
        <meta name="keywords" content={metaDatas.metaKeywords} />
      </ReactHelmet>
      <div className="welcome-section">
        <img
          src="https://demo.casethemes.net/itfirm/wp-content/uploads/2021/12/h5-bg-slider1.jpg"
          alt="welcome-bg"
        />
        <div className="captions">
          <h2>Get the best solution in building a comfortable future.</h2>
        </div>
      </div>
      <Container>
        <div className="services-card-section">
          <HeaderTitle
            bigTitle="Financial Solutions"
            title="Closer to a better future"
            description="We provide the necessary services to you."
          />
        </div>
        <div className="solutions">
          <div className="solutions-item" id="life-insurance">
            <div className="solution-header">
              <div className="divider"></div>
              <h2>Life Insurance</h2>
              <p>
                Life insurance is, at its most basic level, a commitment made
                between an insurance provider and the policyholder. When the
                individual whose life is being insured passes away, the
                insurance company will pay the person (beneficiary) you specify
                a set amount (death benefit) if you pay a specific amount
                (premium) to the insurance company.
              </p>
            </div>
            {lifeInsuranceAccordions.map((solution) => (
              <Accordion
                expanded={expanded === solution.title}
                onChange={handleChange(solution.title)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{solution.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="article-content">
                    <div className="article">{solution.description}</div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <div className="solutions-item" id="annuity">
            <div className="solution-header">
              <h2>Annuities</h2>
              <p>
                An annuity is a contract with an insurance provider that calls
                for regular payments to be made by the insurer to you, either
                now or in the future. Either a single payment or a series of
                payments are required to purchase an annuity.
              </p>
            </div>
            {annuityAccordions.map((solution) => (
              <Accordion
                expanded={expanded === solution.title}
                onChange={handleChange(solution.title)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{solution.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="article-content">
                    <div className="article">{solution.description}</div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        <div className="contact-us">
          <ContactUs />
          <div className="contact-btn">
            <Button variant="danger">Book an Appointment</Button>
          </div>
        </div>
      </Container>
      <WorkingSteps
        backgroundImage="https://ibb.co/bW0cj7w"
        bigTitle={
          <React.Fragment>
            Easy steps to <span>comfortable future!</span>
          </React.Fragment>
        }
        title="WORKING STEPS"
        steps={workingSteps}
      />
    </div>
  );
};

export default Solutions;
