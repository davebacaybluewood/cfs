import React from "react";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import MapSection from "./components/MapSection/MapSection";
import Overview from "./components/Overview-Family/Overview";
import InquirySection from "./components/Inquiry-Section/InquirySection";
import Subscription from "./components/Subscription/Subscription";
import HeadlineFamily from "./components/HeadlineFamily/HeadlineFamily";
import HelpSection from "./components/HelpSection/HelpSection";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeadlineFamily />
      <Overview />
      <HelpSection />
      <InquirySection />
      <Subscription />
      <div className="map-section">
        <div className="half-bg" />
        <MapSection />
        <QuestionForm />
      </div>
    </React.Fragment>
  );
};

export default Home;
