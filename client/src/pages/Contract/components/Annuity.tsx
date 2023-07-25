import { Grid } from "@mui/material";
import React from "react";
import "./Annuity.scss";
import ButtonContract from "./ButtonContract";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import { AiOutlineArrowRight } from "react-icons/ai";

const Annuity: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="annuity-wrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <div className="left-col">
            <div className="col-content">
              <h2>Annuity Carriers</h2>
              <p>
                American Equity <br /> Athene Nassau RE <br />
                Global Atlantic
              </p>
              <div className="left-btn">
                <ButtonContract
                  button={{
                    text: "Sign up here",
                    icon: <AiOutlineArrowRight />,
                    onclick: () => navigate(paths.home), //change onclick link
                  }}
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className="right-col">
            <div className="col-content">
              <h2>Life Carriers</h2>
              <p>
                American Equity <br /> Athene Nassau RE <br />
                Global Atlantic
              </p>
              <div className="right-btn">
                <ButtonContract
                  button={{
                    text: "Sign up here",
                    icon: <AiOutlineArrowRight />,
                    onclick: () => navigate(paths.home), //change onclick link
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

export default Annuity;
