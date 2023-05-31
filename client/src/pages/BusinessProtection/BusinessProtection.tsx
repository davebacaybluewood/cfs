import React from "react";
import Navbar from "layout/Navbar/Navbar";
import Footer from "layout/Footer/Footer";
import SolutionBusiness from "./components/SolutionBusiness/solutionBusiness";
import ConsultationBusiness from "./components/ConsultationBusiness/ConsultationBusiness";
import ProcessBusiness from "./components/ProcessBusiness/ProcessBusiness";
import PlanBusiness from "./components/PlanBusiness/PlanBusiness";
import FAQBusiness from "./components/FAQs/FAQBusiness";

import "./BusinessProtection.scss";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Headline from "library/Headline/Headline";
import Button from "library/Button/Button";
const BusinessProtection: React.FC = () => (
  <div className="business__protection">
    <div className="navbar__business">
      <Navbar />
    </div>
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
    <Blogs title="Latest News and Updates" blogs={blogsDummy} />
    <FAQBusiness />
    <Footer />
  </div>
);

export default BusinessProtection;
