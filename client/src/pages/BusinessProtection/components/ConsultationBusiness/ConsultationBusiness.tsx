import Consultation from "library/Consultation/Consultation";
import React from "react";
import "./ConsultationBusiness.scss";

const ConsultationBusiness: React.FC = () => {
  return (
    <div className="consultation__container">
      <Consultation
        title="Why choose CFS?"
        description1="We specialize in business insurance, bringing deep knowledge and experience in understanding the unique risks faced by businesses across various industries. Our expertise allows us to provide tailored insurance solutions that address your specific needs, ensuring comprehensive coverage."
        description2="We take the time to understand your business, industry, and risk profile to design customized insurance plans. Our dedicated advisors offer personalized guidance, crafting policies that align with your objectives and provide the right coverage for your business."
        button={{
          text: "Free Consultation",
        }}
        image="/assets/others/insured-business.jpg"
      />
    </div>
  );
};

export default ConsultationBusiness;
