import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import classNames from "classnames";
import aboutUs from "data/aboutUs";
import { isEven, isOdd } from "helpers/isEvenOrOdd";
import useResponsive from "hooks/useResponsive";
import Banner from "library/Banner/Banner";
import ContentCard from "library/ContentCard/ContentCard";
import "./AboutUs.scss";
import ReactHelmet from "react-helmet";
import React from "react";

const AboutUs = () => {
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
          bigTitle="About Us"
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
                src="/assets/others/lines.svg"
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
                    {/* <Parallax bgImage={item.image} strength={1}>
                      <div style={{ height: 500 }}></div>
                    </Parallax> */}
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
        {/* <div className="team-members">
          <Container>
            <HeaderTitle
              bigTitle="Our Awesome Creative Team Member"
              title="TEAM MEMBER"
              hasBorder={true}
            />
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {members.map((member) => (
                <Grid item xs={6} md>
                  <div className="team-members-card">
                    <img src={member.image} />
                    <div className="team-members-captions">
                      <h5>{member.name}</h5>
                      <p>{member.position}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default AboutUs;
