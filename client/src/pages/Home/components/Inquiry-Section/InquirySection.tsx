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
            Financial Comfort <br /> Now and Tomorrow
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
        image="/assets/images/home/rectangle-image1.png"
        align="right"
        color="navy"
        buttonConfigs={{
          text: "Learn More 1",
          onClick: () => learnMoreHandler("family-protection"),
        }}
      />
      <InquiryCard
        header={
          <React.Fragment>
            Financial Comfort <br /> Now and Tomorrow
          </React.Fragment>
        }
        description={
          <React.Fragment>
            CFS helps individuals and families build a <br />
            comfortable future by advocating Financial <br /> Awareness and
            providing Risk Management
            <br /> Solutions.z
          </React.Fragment>
        }
        image="/assets/images/home/rectangle-image2.png"
        align="left"
        color="blue"
        buttonConfigs={{
          text: "Learn More 2",
          onClick: () => learnMoreHandler("business-protection"),
        }}
      />
      <InquiryCard
        header={
          <React.Fragment>
            Financial Comfort <br /> Now and Tomorrow
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
          text: "Learn More 3",
          onClick: () => learnMoreHandler("agent-support"),
        }}
      />
    </Container>
  );
};

export default InquirySection;
