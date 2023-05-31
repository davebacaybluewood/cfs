import { Container, Grid } from "@mui/material";
import LinkCard from "library/LinkCard/LinkCard";
import React from "react";
import "./FAQBusiness.scss";

const FAQBusiness: React.FC = () => {
  const linkCardHandler = () => {
    console.log("Clicked!");
  };
  return (
    <div className="faq-business-container">
      <Container>
        <div className="section__title">
          <h2>Frequently Asked Questions (FAQ)</h2>
        </div>
        <div className="section__description">
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </h6>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LinkCard
              title="What are the common coverage benefits under my life insurance?"
              onClick={linkCardHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LinkCard
              title="How will life insurance pay for my emergency medical expenses?"
              onClick={linkCardHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LinkCard
              title="What is the eligible age to buy life insurance?"
              onClick={linkCardHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LinkCard
              title="Why should I buy life insurance?"
              onClick={linkCardHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LinkCard
              title="Will I be allowed to cover my family under my life insurance?"
              onClick={linkCardHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LinkCard
              title="Will I be allowed to cover my family under my life insurance?"
              onClick={linkCardHandler}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FAQBusiness;
