import { Grid } from "@mui/material";
import React from "react";
import ButtonContract from "./ButtonContract";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import "./PreLicensing.scss";
import { AiOutlineArrowRight } from "react-icons/ai";

const PreLicensing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="pre-licensing-wrapper">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6} lg={6}>
          <div className="left-col">
            <div className="col-content">
              <h2>Pre-Licensing</h2>
              <div className="white-btn">
                {" "}
                <ButtonContract
                  button={{
                    text: "Proceed",
                    onclick: () => navigate(paths.home), //change onclick link
                    icon: <AiOutlineArrowRight />,
                  }}
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className="right-col">
            <div className="col-content">
              <h2>
                Contracting & <br /> Appointments
              </h2>
              <div className="blue-btn">
                <ButtonContract
                  button={{
                    text: "Proceed",
                    onclick: () => navigate(paths.home), //change onclick link
                    icon: <AiOutlineArrowRight />,
                  }}
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreLicensing;
