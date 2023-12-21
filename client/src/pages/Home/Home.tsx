import React, { useEffect, useState } from "react";
import MapSection from "./components/MapSection/MapSection";
import Overview from "./components/Overview-Family/Overview";
import InquirySection from "./components/Inquiry-Section/InquirySection";
import Subscription from "./components/Subscription/Subscription";
import HeadlineFamily from "./components/HeadlineFamily/HeadlineFamily";
import HelpSection from "./components/HelpSection/HelpSection";
import CalendlySection from "./components/QuestionForm/CalendlySection";
import Head from "library/Head/Head";
import METATAGS from "constants/metatags";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { CALENDLY } from "constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import Blogs from "library/Blogs/Blogs";

const Home: React.FC = () => {
  const [calendlyWeekly, setCalendlyWeekly] = useState(false);
  const [calendlyConsultation, setCalendlyConsultation] = useState(false);
  const [activeCalendly, setActiveCalendly] = useState("");
  const navigate = useNavigate();

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      setCalendlyConsultation(false);
      setCalendlyWeekly(false);
      // navigate(paths.pageSuccess.replace(":pageId", activeCalendly));
    },
  });

  const search = useLocation().search;
  const isPopupOpenWeekly = new URLSearchParams(search).get("weeklyOpen");
  const isPopupOpenConsultation = new URLSearchParams(search).get(
    "consultationOpen"
  );

  useEffect(() => {
    if (isPopupOpenWeekly) {
      setCalendlyWeekly(true);
      setActiveCalendly("edge");
    }

    if (isPopupOpenConsultation) {
      setCalendlyConsultation(true);
      setActiveCalendly("consultation");
    }
  }, [isPopupOpenWeekly, isPopupOpenConsultation]);
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
        {/* <CalendlySection /> */}
      </div>
      <Subscription />
      <Blogs
        title="Latest Blogs"
        blogsConfig={{
          limit: 3,
          skip: 0,
        }}
      />

      <div className="calendly-modals">
        <PopupModal
          url={CALENDLY.CONSULTATION}
          onModalClose={() => {
            setCalendlyConsultation(false);
            setActiveCalendly("");
          }}
          open={calendlyConsultation}
          rootElement={document.getElementById("root") as any}
        />

        <PopupModal
          url={CALENDLY.WEEKLY}
          onModalClose={() => {
            setCalendlyWeekly(false);
            setActiveCalendly("");
          }}
          open={calendlyWeekly}
          rootElement={document.getElementById("root") as any}
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
