import { Container, Grid } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Benefits.scss";
import { paths } from "constants/routes";

const Benefits: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container className="main-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6}>
          <div className="content-container">
            <div className="section-title">
              <h2>What Benefits We Provide</h2>
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
                  <h3>Career Growth</h3>
                </div>
                <div className="box-description">
                  <p>
                    We believe in nurturing talent and fostering professional
                    development.
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
                  <h3>Tools and Systems</h3>
                </div>
                <div className="box-description">
                  <p>
                    Success in the insurance industry relies on cutting-edge
                    technology and streamlined processes.
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
                  <h3>Commisions</h3>
                </div>
                <div className="box-description">
                  <p>
                    We value your hard work and dedication, and we believe that
                    your earnings should reflect that.
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="danger"
              onClick={() => navigate(paths.portalRegistration)}
            >
              Become an Agent
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <div className="content-image">
            <img src="/assets/images/Rectangle 77.png" alt="" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Benefits;
