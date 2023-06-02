import Subscription from "pages/Home/components/Subscription/Subscription";
import React from "react";
import Headline from "./components/HeadlineBlogs/Headline";
import FAQBusiness from "library/FAQsRedirect/FAQBusiness";
import ContactUs from "./components/ContactUs/ContactUs";

const ContactPage: React.FC = () => {
  return (
    <React.Fragment>
      <Headline />
      <ContactUs />
      <FAQBusiness />
      <Subscription />
    </React.Fragment>
  );
};

export default ContactPage;
