import React from "react";
import MapSection from "./components/MapSection/MapSection";
import Overview from "./components/Overview-Family/Overview";
import InquirySection from "./components/Inquiry-Section/InquirySection";
import Subscription from "./components/Subscription/Subscription";
import HeadlineFamily from "./components/HeadlineFamily/HeadlineFamily";
import HelpSection from "./components/HelpSection/HelpSection";
import CalendlySection from "./components/QuestionForm/CalendlySection";
import Head from "library/Head/Head";
import METATAGS from "constants/metatags";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Head
        title={METATAGS.HOME.TITLE}
        keywords={METATAGS.HOME.KEYWORDS.join(", ")}
        canonical={window.location.href}
        description={METATAGS.HOME.DESCRIPTION}
      >
        <meta
          name="google-site-verification"
          content="-8SXobMJclzxTwefhzJ8i5kaM7zpKD-I3VqkfnJtWwc"
        />
        <meta name="msvalidate.01" content="11FA9EC5F1F79FDD3E3761BCB55B12D1" />
      </Head>
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
