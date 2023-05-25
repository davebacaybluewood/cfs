import { Container } from "@mui/system";
import React from "react";

import InquiryCard from "../InquiryCard/InquiryCard";

const SectionFour: React.FC = () => {
  return (
    <Container>
      <InquiryCard
        header={
          <React.Fragment>
            Financial Comfort,
            <br /> now And Tomorrow
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
        }}
      />
      <InquiryCard
        header={
          <React.Fragment>
            Financial Comfort,
            <br /> now And Tomorrow
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
        image="/assets/images/home/rectangle-image2.png"
        align="left"
        color="blue"
        buttonConfigs={{
          text: "Learn More 2",
        }}
      />
      <InquiryCard
        header={
          <React.Fragment>
            Financial Comfort,
            <br /> now And Tomorrow
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
        }}
      />
    </Container>
  );
};

export default SectionFour;
