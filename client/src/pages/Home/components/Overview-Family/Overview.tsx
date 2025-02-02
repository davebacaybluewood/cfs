import { Container, Grid } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";

import "./Overview.scss";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "constants/routes";

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const learnMoreHandler = () => {
    navigate(paths.about_us);
  };

  return (
    <div className="overview">
      <Container className="section-two">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="overview__image__container">
              <img src="\assets\images\home\overview.png" alt="" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="overview__content">
              <div className="overview__title">
                <h3>
                  Financial Comfort, <br /> Now and Tomorrow.
                </h3>
              </div>
              <div className="overview__text">
                <p style={{ marginBottom: "2.4rem" }}>
                  CFS helps individuals and families build a comfortable future
                  by advocating Financial Awareness and providing Risk
                  Management Solutions.
                </p>
                <p>CFS offers Life Insurance and Annuities.</p>
              </div>
              <div className="ambition__container">
                <Link to={paths.about_us}>
                  <div className="inline-block">
                    <div className="small-card">
                      <div className="card-img">
                        <img src="\assets\images\home\Light_Bulb.png" alt="" />
                      </div>
                      <div className="card-captions">
                        <div className="card-title">
                          <h3>Our Mission</h3>
                        </div>
                        <div className="card-subtitle">
                          <p>Learn about our mission</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={paths.about_us}>
                  <div className="inline-block">
                    <div className="small-card">
                      <div className="card-img">
                        <img src="\assets\images\home\Star.png" alt="" />
                      </div>
                      <div className="card-captions">
                        <div className="card-title">
                          <h3>Our Vision</h3>
                        </div>
                        <div className="card-subtitle">
                          <p>Learn about our vision</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Overview;
