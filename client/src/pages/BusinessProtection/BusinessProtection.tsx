import React from "react";
import SolutionBusiness from "./components/SolutionBusiness/solutionBusiness";
import ConsultationBusiness from "./components/ConsultationBusiness/ConsultationBusiness";
import ProcessBusiness from "./components/ProcessBusiness/ProcessBusiness";
import PlanBusiness from "./components/PlanBusiness/PlanBusiness";

import "./BusinessProtection.scss";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Headline from "library/Headline/Headline";
import Button from "library/Button/Button";
import FAQs from "library/FAQs/FAQs";
import { faqs } from "pages/FamilyProtection/components/FamilyProtection";
const BusinessProtection: React.FC = () => (
  <div className="business__protection">
    <Headline
      title="Sample hook and headline"
      description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      backgroundImage="/assets/images/headline-images/business-protection-image.png"
    >
      <div className="headline__btn">
        <Button variant="danger" className="danger__btn">
          Free Consultation
        </Button>
        <Button variant="default">Learn More</Button>
      </div>
    </Headline>
    <PlanBusiness />
    <SolutionBusiness />
    <ConsultationBusiness />
    <ProcessBusiness />
    <FAQs
      title="Frequently Asked Questions (FAQ)"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      faqs={faqs}
    />
    <Blogs title="Latest News and Updates" blogs={blogsDummy} />
  </div>
);

export default BusinessProtection;
