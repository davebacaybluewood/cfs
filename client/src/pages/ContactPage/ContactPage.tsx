import Subscription from "pages/Home/components/Subscription/Subscription";
import React from "react";
import ContactUs from "./components/ContactUs/ContactUs";
import FAQs from "library/FAQs/FAQs";
import HeadlineContact from "./components/HeadlineContact/HeadlineContact";
import { faqs } from "pages/FamilyProtection/components/FamilyProtectionFAQs";
import useScroll from "hooks/useScroll";
import "./ContactPage.scss";

const ContactPage: React.FC = () => {
  useScroll();
  return (
    <div className="contact-page-wrapper">
      <HeadlineContact />
      <ContactUs title="Other Ways to Contact Us" />
      <FAQs faqs={faqs} title="Frequently Asked Questions (FAQ)" />
      <Subscription />
    </div>
  );
};

export default ContactPage;
