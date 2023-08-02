import Wrapper from "admin/components/Wrapper/Wrapper";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import "./Licensing.scss";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
import Badge from "library/Badge/Badge";
import { Grid, Paper } from "@mui/material";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Licensing",
    url: paths.licensing,
    isActive: true,
  },
];

const Licensing: React.FC = () => {
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="users-container"
    >
      <div className="license-container">
        <Title title="Licensing Resources" subtitle="" />
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 0, height: "70%" }}>
              <div className="license-option">
                <div className="license-option-header">
                  <h2>Pre-Licensing</h2>
                  <p>
                    <span>Links to Pre-Licensing class.</span>
                  </p>
                </div>
                <ul>
                  <li>
                    <Badge>
                      Promo Code: <span className="promo-code">#2248046</span>
                    </Badge>
                    <Link
                      to="https://www.adbanker.com/default.aspx"
                      target="_blank"
                    >
                      <span>Adbanker</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                  <li>
                    <Badge>
                      Discount Code:{" "}
                      <span className="promo-code">#STUDY2023</span>
                    </Badge>
                    <Link
                      to="https://prelicensetraining.com/prelicense-training"
                      target="_blank"
                    >
                      <span>PreLicense Training</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 0, height: "70%" }}>
              <div className="license-option">
                <h2></h2>
                <div className="license-option-header">
                  <h2>State Exam Registration</h2>
                  <p>
                    <span>
                      Links to state exam registration and scheduling.
                    </span>
                  </p>
                </div>
                <ul>
                  <li>
                    <Link to="https://candidate.psiexams.com " target="_blank">
                      <span>PSI Exam</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://home.pearsonvue.com/" target="_blank">
                      <span>Personvue</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div className="license-container">
        <Title title="Anti Money Laundering Resources" subtitle="" />
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 0, height: "70%" }}>
              <div className="license-option">
                <div className="license-option-header">
                  <h2>AML- Anti-Money-Laundering</h2>
                  <p>
                    <span>Links of the Anti Money Laundering.</span>
                  </p>
                </div>
                <ul>
                  <li>
                    <Link to="https://successce.com" target="_blank">
                      <span>SuccessCE</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.limra.com/" target="_blank">
                      <span>Limra</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 0, height: "70%" }}>
              <div className="license-option">
                <h2></h2>
                <div className="license-option-header">
                  <h2>E&O - Errors & Omissions</h2>
                  <p>
                    <span>
                      Link to Affordable NAPA (E&O) Insurance Options for
                      Insurance Agents, and More.
                    </span>
                  </p>
                </div>
                <ul>
                  <li>
                    <Link
                      to="https://www.napa-benefits.org/insurance/errors-and-omissions-eando-insurance"
                      target="_blank"
                    >
                      <span>NAPA Errors and Omissions (E&O) Insurance</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div className="license-container">
        <Title
          title="License Certificate & Continuing Education Resources"
          subtitle=""
        />
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 0, height: "70%" }}>
              <div className="license-option">
                <div className="license-option-header">
                  <h2>License Certificate</h2>
                  <p>
                    <span>Link to download or print your license.</span>
                  </p>
                </div>
                <ul>
                  <li>
                    <Link to="https://nipr.com" target="_blank">
                      <span>NIPR</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 0, height: "70%" }}>
              <div className="license-option">
                <div className="license-option-header">
                  <h2>Continuing Education</h2>
                  <p>
                    <span>Links to continuing education options.</span>
                  </p>
                </div>
                <ul>
                  <li>
                    <Badge>
                      Promo Code: <span className="promo-code">#2248046</span>
                    </Badge>
                    <Link
                      to="https://www.adbanker.com/default.aspx"
                      target="_blank"
                    >
                      <span>Adbanker</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                  <li>
                    <Badge>
                      Discount Code:{" "}
                      <span className="promo-code">#STUDY2023</span>
                    </Badge>
                    <Link
                      to="https://prelicensetraining.com/prelicense-training"
                      target="_blank"
                    >
                      <span>PreLicense Training</span>
                      <BiLinkExternal />
                    </Link>
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

export default Licensing;
