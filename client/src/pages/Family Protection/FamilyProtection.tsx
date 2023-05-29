import Footer from "layout/Footer/Footer";
import Navbar from "layout/Navbar/Navbar";
import React from "react";
import Process from "./components/Process/Process";
import Solution from "./components/Solution/Solution";
import Plan from "./components/Plan/Plan";
import Blogs from "library/Blogs/Blogs";
import FAQs from "library/FAQs/FAQs";
import Headline from "../../library/Headline/Headline";
import Button from "library/Button/Button";
import { blogsDummy } from "./data";
import { faqs } from "./components/FamilyProtection";
import Consultation from "library/twoColumnSectionContent/twoColumnSectionContent";

const FamilyProtection: React.FC = () => (
  <div className="family-protection__page">
    <Navbar />
    <div className="main-page__content">
      <div className="headline">
        <Headline
          title={
            <React.Fragment>
              Sample hook <br /> and headline
            </React.Fragment>
          }
          description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
          image="\assets\images\home\rectangle-image1.png"
        >
          <div className="headline__btn">
            <Button variant="danger" className="danger__btn">
              Free Consultation
            </Button>
            <Button variant="default">Learn More</Button>
          </div>
        </Headline>
      </div>
      <div className="plan">
        <Plan />
      </div>
      <div className="solution">
        <Solution />
      </div>
      <div className="twoColumnSectionContent">
        <Consultation
          title="Why Choose CFS?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          image="\assets\images\home\rectangle-image1.png"
          button={{
            text: "Free Consultation",
          }}
        />
      </div>
      <div className="process">
        <Process />
      </div>
      <div className="faqs">
        <FAQs title="Frequently Asked Questions (FAQ)" faqs={faqs} />
      </div>

      <Blogs title="Latest from the blog" blogs={blogsDummy} />
    </div>
    <Footer />
  </div>
);

export default FamilyProtection;
