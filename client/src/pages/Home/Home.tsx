import React from "react";
import MapSection from "./components/MapSection/MapSection";
import Overview from "./components/Overview-Family/Overview";
import InquirySection from "./components/Inquiry-Section/InquirySection";
import Subscription from "./components/Subscription/Subscription";
import HeadlineFamily from "./components/HeadlineFamily/HeadlineFamily";
import HelpSection from "./components/HelpSection/HelpSection";
import CalendlySection from "./components/QuestionForm/CalendlySection";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeadlineFamily />
      <Overview />
      <HelpSection />
      <InquirySection />
      <div className="map-section">
        <div className="half-bg" />
        <MapSection />
        <CalendlySection />
      </div>
      <Subscription />
    </React.Fragment>
  );
};

export default Home;
