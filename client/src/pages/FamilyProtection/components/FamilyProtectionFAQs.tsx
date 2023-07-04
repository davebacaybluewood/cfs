import React from "react";
import "./FamilyProtectionFAQs.scss";
import { paths } from "constants/routes";
import { Link } from "react-router-dom";

// FAQs Data
const faqs = (url: string) => {
  const data = [
    {
      id: "1",
      title: "What are the common coverage benefits under my life insurance?",
      description: (
        <React.Fragment>
          {" "}
          Whether you have term or permanent life insurance coverage, if you
          pass away while your policy is active, your beneficiaries will receive
          your death benefit. However, there are certain instances where a death
          benefit isn't guaranteed. <br />{" "}
          <a href={paths.resources} target="_blank">
            Learn More
          </a>
        </React.Fragment>
      ),
    },
    {
      id: "2",
      title: "Can I buy life insurance for someone else",
      description:
        "Anyone can buy life insurance as long as there is insurable interest present. You must prove that you rely on someone else while they are alive and would suffer financially if that person died.",
    },

    {
      id: "3",
      title: "How will life insurance pay for my emergency medical expenses?",
      description:
        "Life insurance policies have optional riders that you can add onto your policy. In this specific case you can add on a “Terminal illness” rider that will help you cover medical costs and care.",
    },
    {
      id: "4",
      title: "How much does a life insurance policy cost?",
      description:
        "The cost of your life insurance policy will depend on a variety of important factors. Your life insurance agent will need to know your age, gender, lifestyle, the type of life insurance you need and your medical status, which may require a physical examination from a medical doctor.",
    },
    {
      id: "5",
      title: "What is the best life insurance plan for me?",
      description: (
        <React.Fragment>
          <Link to={`${url}?consultation1=true`}>Schedule a consultation</Link>{" "}
          with a CFS expert to find the best suited policy for you.
        </React.Fragment>
      ),
    },
    {
      id: "6",
      title: "How do I get started?",
      description: (
        <React.Fragment>
          Schedule a consultation with a CFS expert to{" "}
          <Link to={`${url}?consultation2=true`}>learn more.</Link>{" "}
        </React.Fragment>
      ),
    },
  ];

  return data;
};

const filteredFaqs = (url: string) => {
  return faqs(url).map((data, index) => {
    return {
      ...data,
      title: data.title,
    };
  });
};

export { faqs, filteredFaqs };
