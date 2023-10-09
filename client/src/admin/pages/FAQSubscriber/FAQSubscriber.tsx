import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./FAQSubscriber.scss";
import Indicator from "admin/components/Indicator/Indicator";
import StandardCard from "library/StandardCard/StandardCard";
import { faqs } from "./FAQdummy";
import { Grid } from "@mui/material";
import PageTitle from "library/PageTitle/PageTitle";
import Title from "admin/components/Title/Title";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "FAQs",
    url: paths.faqs,
    isActive: true,
  },
];

const FAQSubscriber: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs}>
      <PageTitle key="title" title="Frequently Asked Questions (FAQ)" />

      <div className="faq-subscriber-container">
        <Title
          title="Frequently Asked Questions (FAQ)"
          subtitle="List of FAQs"
        />
        <Grid container spacing={2}>
          {faqs.map((f) => {
            return (
              <Grid item xs={12}>
                <StandardCard
                  key={f.id}
                  title={f.title}
                  description={f.description}
                ></StandardCard>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Wrapper>
  );
};

export default FAQSubscriber;
