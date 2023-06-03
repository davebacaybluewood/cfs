import { Container, Grid } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";
import "./Benefits.scss";

const Benefits: React.FC = () => {
  return (
    <Container className="main-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6}>
          <div className="content-container">
            <div className="section-title">
              <h2>What Benefits We Provide</h2>
            </div>
            <div className="description">
              <p>
                The most important of insurance is the payment of losses. An
                insurance policy is a contract used to indemnify individuals and
                organizations for covered losses.{" "}
              </p>
            </div>
            <div className="boxes">
              <div className="box-image">
                <img
                  src="assets/images/benefits/regular-trainings.png"
                  alt=""
                />
              </div>
              <div className="box-content">
                <div className="box-title">
                  <h3>Regular Trainings</h3>
                </div>
                <div className="box-description">
                  <p>
                    Refers to the peace of mind felt when we aren't worried
                    about money.
                  </p>
                </div>
              </div>
            </div>
            <div className="boxes">
              <div className="box-image">
                <img src="assets/images/benefits/tools-systems.png" alt="" />
              </div>
              <div className="box-content">
                <div className="box-title">
                  <h3>Regular Trainings</h3>
                </div>
                <div className="box-description">
                  <p>
                    Refers to the peace of mind felt when we aren't worried
                    about money.
                  </p>
                </div>
              </div>
            </div>
            <div className="boxes">
              <div className="box-image">
                <img src="assets/images/benefits/commisions.png" alt="" />
              </div>
              <div className="box-content">
                <div className="box-title">
                  <h3>Regular Trainings</h3>
                </div>
                <div className="box-description">
                  <p>
                    Refers to the peace of mind felt when we aren't worried
                    about money.
                  </p>
                </div>
              </div>
            </div>
            <Button variant="danger">Become an Agent</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <div className="content-image">
            <img src="\assets\images\home\Rectangle 77.png" alt="" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Benefits;
