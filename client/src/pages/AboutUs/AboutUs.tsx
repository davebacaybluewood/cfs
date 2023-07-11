import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import classNames from "classnames";
import aboutUs from "data/aboutUs";
import { isEven, isOdd } from "helpers/isEvenOrOdd";
import useResponsive from "hooks/useResponsive";
import Banner from "library/Banner/Banner";
import ContentCard from "library/ContentCard/ContentCard";
import ReactHelmet from "react-helmet";
import useScroll from "hooks/useScroll";
import "./AboutUs.scss";

const AboutUs = () => {
  useScroll();

  const isMobileMode = useResponsive("mobile");

  const metaKeywords = [
    "financial advisor las vegas nv",
    "life insurance agent los angeles",
    "financial awareness",
  ].join(", ");

  return (
    <React.Fragment>
      <div className="about">
        <ReactHelmet>
          <title>
            Financial & Life Insurance Advisor | Comfort Financial Solutions
          </title>
          <link rel="canonical" href={window.location.href} />
          <meta
            name="description"
            content="Comfort Financial Solutions is an annuity and life insurance advisor that offers financial solutions to help secure your financial future. Contact us today!"
          />
          <meta
            name="keywords"
            content="financial awareness, financial advisor las vegas nv, life insurance agent los angeles"
          />
        </ReactHelmet>
        <Banner
          bigTitle="Solutions"
          title="Learn more about Comfort Financial"
          hasBorder={true}
        />
        {aboutUs.map((item, index) => {
          const lineSvgClassnames = classNames("line-svg", {
            "line-svg-left": isEven(index),
            "line-svg-right": isOdd(index),
          });
          return (
            <div className="wrapper">
              <img
                src="/assets/images/about-us/lines.svg"
                className={lineSvgClassnames}
              />
              <Container>
                <Grid
                  container
                  direction={isEven(index) ? "row" : "row-reverse"}
                  justifyContent="center"
                  alignItems="center"
                  className="about-grid"
                >
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <img src={item.image} alt="happy photo" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <ContentCard {...item} isMobileMode={isMobileMode} />
                  </Grid>
                </Grid>
              </Container>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default AboutUs;
