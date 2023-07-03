import { Container } from "@mui/system";
import React from "react";
import InquiryCard from "../InquiryCard/InquiryCard";
import { useNavigate } from "react-router-dom";

type InquiryType =
  | "individual-protection"
  | "family-protection"
  | "become-a-cfs-agent";

const InquirySection: React.FC = () => {
  const navigate = useNavigate();

  const learnMoreHandler = (type: InquiryType) => {
    let btnLink: string;

    if (type === "become-a-cfs-agent") {
      btnLink = "/become-a-cfs-agent";
    } else if (type === "individual-protection") {
      btnLink = "/individual-protection";
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
            Ensuring Personal Financial <br /> Stability and Resilience
          </React.Fragment>
        }
        description={
          <React.Fragment>
            Take advantage of CFS's strategic financial products. As an
            individual, <br /> life insurance is a crucial component of
            financial planning. Regardless <br /> of age, providing a safety net
            for unexpected events could impact their financial future.
          </React.Fragment>
        }
        image="/assets/images/home/rectangle-image2.png"
        align="right"
        color="blue"
        buttonConfigs={{
          text: "Learn More",
          onClick: () => learnMoreHandler("individual-protection"),
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
            Life insurance is essential for families looking to protect their
            <br />
            financial well-being and provide a better future for their loved
            ones. <br /> In the event of an unexpected death, life insurance can
            help cover expenses such as funeral costs, outstanding debts, and
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

      <InquiryCard
        header={
          <React.Fragment>
            Where Agents Thrive <br /> and Dreams Take Flight
          </React.Fragment>
        }
        description={
          <React.Fragment>
            Get the edge you need to be a successful life insurance agent. CFS
            provides competitive compensation, proven financial solutions, and
            career advancement opportunities.
          </React.Fragment>
        }
        image="/assets/images/home/rectangle-image3.png"
        align="right"
        color="red"
        buttonConfigs={{
          text: "Learn More",
          onClick: () => learnMoreHandler("become-a-cfs-agent"),
        }}
      />
    </Container>
  );
};

export default InquirySection;
