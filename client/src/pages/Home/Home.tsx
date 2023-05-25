import React from "react";
import SectionOne from "./components/Section1/SectionOne";
import SectionThree from "./components/Section3/SectionThree";
import SectionFour from "./components/Section4/SectionFour";
import SectionSeven from "./components/Section7/SectionSeven";
import Subscription from "./components/Section6/Subscription";
import Overview from "./components/Section2/Overview";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import MapSection from "./components/MapSection/MapSection";
const Home: React.FC = () => {
  return (
    <div>
      <div className="section-one">
        <SectionOne />
      </div>
      <div className="section-two">
        <Overview />
      </div>
      <div className="section-three">
        <SectionThree />
      </div>
      <div className="section-four">
        <SectionFour />
      </div>
      <div className="section-six">
        <Subscription />
      </div>
      <div className="map-section">
        <div className="half-bg" />
        <MapSection />
        <QuestionForm />
      </div>
      <div className="section-seven">
        <SectionSeven />
      </div>
    </div>
  );
};

export default Home;
