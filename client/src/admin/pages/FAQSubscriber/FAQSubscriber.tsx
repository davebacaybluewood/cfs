import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./FAQSubscriber.scss";
import Indicator from "admin/components/Indicator/Indicator";
import StandardCard from "library/StandardCard/StandardCard";

import { faqs } from "./FAQdummy";
import { Grid } from "@mui/material";
import Head from "library/Head/Head";
import PageTitle from "library/PageTitle/PageTitle";
import HeaderTitle from "library/HeaderTitle/HeaderTitle";
import Headline from "library/Headline/Headline";

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

const FAQSubscriber: React.FC = (props) => {
  return (
    <Wrapper breadcrumb={crumbs}>
      <PageTitle key="title" title="Frequently Asked Questions (FAQ)" />

      <div className="faq-subscriber-container">
        <div className="section__title">
          <h3>Frequently Asked Questions (FAQ)</h3>
        </div>
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
