import Subscription from "pages/Home/components/Subscription/Subscription";
import React from "react";
import ContactUs from "./components/ContactUs/ContactUs";
import FAQs from "library/FAQs/FAQs";
import HeadlineContact from "./components/HeadlineContact/HeadlineContact";
import { faqs } from "pages/FamilyProtection/components/FamilyProtection";
import useScroll from "hooks/useScroll";
import "./ContactPage.scss";

const ContactPage: React.FC = () => {
  useScroll();
  return (
    <div className="contact-page-wrapper">
      <HeadlineContact />
      <ContactUs />
      <FAQs
        faqs={faqs}
        title="Frequently Asked Questions (FAQ)"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <Subscription />
    </div>
  );
};

export default ContactPage;
