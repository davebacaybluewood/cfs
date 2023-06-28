import { Container } from "@mui/system";
import React from "react";
import InquiryCard from "../InquiryCard/InquiryCard";
import { useNavigate } from "react-router-dom";

type InquiryType =
  | "business-protection"
  | "family-protection"
  | "agent-support";

const InquirySection: React.FC = () => {
  const navigate = useNavigate();

  const learnMoreHandler = (type: InquiryType) => {
    let btnLink: string;

    if (type === "agent-support") {
      btnLink = "/agent-support";
    } else if (type === "business-protection") {
      btnLink = "/business-protection";
    } else {
      btnLink = "/family-protection";
    }

    navigate(btnLink);
  };
  return (
    <Container>
      <InquiryCard
        header={
          <React.Fragment>
            Ensuring Your Business' <br /> Stability and Resilience
          </React.Fragment>
        }
        description={
          <React.Fragment>
            {/* CFS helps individuals and families build a <br />
            comfortable future by advocating Financial <br /> Awareness and
            providing Risk Management
            <br /> Solutions. Commented for future dev use*/}
            CFS solutions for business owners play a pivotal role <br /> in
            safeguarding the financial stability and continuity of <br />{" "}
            business owners. By providing a safety net for unforeseen <br />{" "}
            events,CFS solutions ensure that a business and its people <br />{" "}
            will continue to prosper.
          </React.Fragment>
        }
        image="/assets/images/home/rectangle-image2.png"
        align="left"
        color="blue"
        buttonConfigs={{
          text: "Learn More",
          onClick: () => learnMoreHandler("business-protection"),
        }}
      />

      <InquiryCard
        header={
          <React.Fragment>
            Where Agents Thrive <br /> and Dreams Take Flight
          </React.Fragment>
        }
        description={
          <React.Fragment>
            CFS helps individuals and families build a <br />
            comfortable future by advocating Financial <br /> Awareness and
            providing Risk Management
            <br /> Solutions.
          </React.Fragment>
        }
        image="/assets/images/home/rectangle-image3.png"
        align="right"
        color="red"
        buttonConfigs={{
          text: "Learn More",
          onClick: () => learnMoreHandler("agent-support"),
        }}
      />
      <InquiryCard
        header={
          <React.Fragment>
            Safeguarding Your <br /> Family's Future
          </React.Fragment>
        }
        description={
          <React.Fragment>
            {/* CFS helps individuals and families build a <br />
            comfortable future by advocating Financial <br /> Awareness and
            providing Risk Management
            <br /> Solutions. Commented for future dev use*/}
            Life insurance is essential for families looking to protect their{" "}
            <br />
            financial well-being and provide a better future for their loved
            ones. <br /> In the event of an unexpected death, life insurance can
            help cover expenses such as funeral costs, outstanding debts, and{" "}
            <br />
            ongoing living expenses.
          </React.Fragment>
        }
        image="/assets/images/home/rectangle-image1.png"
        align="left"
        color="navy"
        buttonConfigs={{
          text: "Learn More",
          onClick: () => learnMoreHandler("family-protection"),
        }}
      />
    </Container>
  );
};

export default InquirySection;
