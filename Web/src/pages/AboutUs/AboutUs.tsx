import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import classNames from "classnames";
import aboutUs from "data/aboutUs";
import members from "data/members";
import { isEven, isOdd } from "helpers/isEvenOrOdd";
import useResponsive from "hooks/useResponsive";
import Banner from "library/Banner/Banner";
import ContentCard from "library/ContentCard/ContentCard";
import HeaderTitle from "pages/Home/components/HeaderTitle/HeaderTitle";
import { Parallax } from "react-parallax";
import "./AboutUs.scss";

const AboutUs = () => {
  const isMobileMode = useResponsive("mobile");
  return (
    <div className="about">
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
            <img src="/assets/others/lines.svg" className={lineSvgClassnames} />
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
  );
};

export default AboutUs;
