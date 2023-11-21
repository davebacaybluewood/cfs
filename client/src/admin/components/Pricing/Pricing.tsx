import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./Pricing.scss";
import Button from "library/Button/Button";
import { BsChevronDoubleRight } from "react-icons/bs";
import { paths } from "constants/routes";
import { useNavigate } from "react-router-dom";
import { UserContext } from "admin/context/UserProvider";
import { SubscriptionData } from "admin/models/subscriptionModel";
import agent from "admin/api/agent";
import Spinner from "library/Spinner/Spinner";

const pricingUserData: { [key: string]: any } = {
  Agent: {
    "Main Features": {
      "Finance News and Updates": true,
      "Articles and Blogs": true,
      "Training and Webinars": true,
      "Onsite Networking Events": true,
      "Awards And Recognition": true,
      "Pre Licensing Assistance": true,
      "Post Licensing Assistance": true,
    },
    "CFS Tools And Systems": {
      "Registration And Account Management Dashboard": true,
      "Personal Webpage": true,
      "Appointment System": true,
    },
    "Client Care Hub": {
      "CFS Email Editor": true,
      "CFS Lead Generation System": true,
    },
    "CFS Content Library": {
      "Social Media Materials": true,
      "Email Template": true,
    },
    "Advance Training": {
      "Corporate Training": true,
      "Systems Training": true,
      "Product Training": true,
      "Marketing Training": true,
      "Sales Training": true,
      "Continuing Classes": true,
    },
  },
};

const categories: string[] = [
  "Main Features",
  "CFS Tools And Systems",
  "Client Care Hub",
  "CFS Content Library",
  "Advance Training",
];

const userTypes: string[] = ["Agent"];

const subcategories: { [key: string]: string[] } = {
  "Main Features": [
    "Finance News and Updates",
    "Articles and Blogs",
    "Training and Webinars",
    "Onsite Networking Events",
    "Awards And Recognition",
    "Pre Licensing Assistance",
    "Post Licensing Assistance",
  ],
  "CFS Tools And Systems": [
    "Registration And Account Management Dashboard",
    "Personal Webpage",
    "Appointment System",
  ],
  "Client Care Hub": ["CFS Email Editor", "CFS Lead Generation System"],
  "CFS Content Library": ["Social Media Materials", "Email Template"],
  "Advance Training": [
    "Corporate Training",
    "Systems Training",
    "Product Training",
    "Marketing Training",
    "Sales Training",
    "Continuing Classes",
  ],
};

const Pricing = () => {
  const [agentInfo, setAgentInfo] = useState<SubscriptionData | undefined>();
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await agent.Subscriptions.getAgentCode("1");

      if (res) {
        setAgentInfo(res);
        setLoading(false);
      } else {
        setAgentInfo(undefined);
        setLoading(false);
      }
    };

    getData();
  }, [userGuid]);

  return (
    <div className="pricing-wrapper-admin">
      <Container>
        <div className="header">
          <h1>
            Pricing built <br />
            for amazing agents.
          </h1>
        </div>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <div className="pricing-card pricing-card-dark">
              <Grid container spacing={2} alignItems="center">
                <Grid item md={7}>
                  <div className="card-captions">
                    <h3>Agents</h3>
                    <p>
                      Access a complete payments platform with simple,
                      pay-as-you-go pricing. No setup fees, monthly fees, or
                      hidden fees.
                    </p>
                    <Button
                      variant="danger"
                      onClick={() =>
                        window.open(
                          "https://agent.comfortfinancialsolutions.com/signup",
                          "_blank"
                        )
                      }
                      style={{
                        paddingLeft: 25,
                        paddingRight: 25,
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Loading...</span>
                      ) : (
                        <React.Fragment>
                          <span
                            style={{
                              fontWeight: 900,
                            }}
                          >
                            BECOME AN AGENT
                          </span>
                          {agentInfo?.agentCode ? (
                            <div
                              style={{
                                marginTop: 5,
                                fontWeight: 300,
                              }}
                            >
                              Use
                              <span
                                style={{
                                  marginLeft: 4,
                                  borderBottom: "1px dotted #fff",
                                  fontWeight: 900,
                                }}
                              >
                                {agentInfo?.agentCode}
                              </span>{" "}
                              as referral code
                            </div>
                          ) : null}
                        </React.Fragment>
                      )}
                    </Button>
                  </div>
                </Grid>
                <Grid item md={5} alignContent="center" textAlign="center">
                  <div className="price">
                    <h5>$149.00</h5>
                    <span>One time payment</span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          {window.innerWidth >= 768 ? (
            <Grid item md={10} lg={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h4"></Typography>
                      </TableCell>
                      {userTypes.map((userType) => (
                        <TableCell key={userType} align="center">
                          <Typography
                            variant="h4"
                            style={{ fontFamily: "Agrandir" }}
                          >
                            {userType}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((mainCategory) => (
                      <React.Fragment key={mainCategory}>
                        <TableRow>
                          <TableCell colSpan={userTypes.length + 1}>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                fontFamily: "Agrandir",
                              }}
                            >
                              {mainCategory}
                            </div>
                          </TableCell>
                        </TableRow>
                        {subcategories[mainCategory].map((subcategory) => (
                          <TableRow key={subcategory}>
                            <TableCell
                              style={{
                                fontSize: "14px",
                                background: "#f6f9fc",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: `"Montserrat", sans-serif`,
                                }}
                              >
                                {subcategory}
                              </span>
                            </TableCell>
                            {userTypes.map((userType) => (
                              <TableCell
                                key={userType}
                                align="center"
                                style={{ background: "#f6f9fc" }}
                              >
                                {pricingUserData[userType][mainCategory][
                                  subcategory
                                ] ? (
                                  <IconButton color="primary" aria-label="True">
                                    <CheckIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton color="error" aria-label="False">
                                    <CloseIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      {userTypes.map((userType) => (
                        <TableCell key={userType} align="center">
                          <Button
                            variant="danger"
                            onClick={() =>
                              window.open(
                                "https://agent.comfortfinancialsolutions.com/signup",
                                "_blank"
                              )
                            }
                            style={{
                              paddingLeft: 25,
                              paddingRight: 25,
                            }}
                            disabled={loading}
                          >
                            {loading ? (
                              <span>Loading...</span>
                            ) : (
                              <React.Fragment>
                                <span
                                  style={{
                                    fontWeight: 900,
                                  }}
                                >
                                  BECOME AN AGENT
                                </span>
                                {agentInfo?.agentCode ? (
                                  <div
                                    style={{
                                      marginTop: 5,
                                      fontWeight: 300,
                                    }}
                                  >
                                    Use
                                    <span
                                      style={{
                                        marginLeft: 4,
                                        borderBottom: "1px dotted #fff",
                                        fontWeight: 900,
                                      }}
                                    >
                                      {agentInfo?.agentCode}
                                    </span>{" "}
                                    as referral code
                                  </div>
                                ) : null}
                              </React.Fragment>
                            )}
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h4"></Typography>
                      </TableCell>
                      {userTypes.map((userType) => (
                        <TableCell key={userType} align="center">
                          <Typography
                            variant="h4"
                            style={{
                              fontWeight: "bold",
                              fontFamily: "Agrandir",
                              fontSize: ".9rem",
                            }}
                          >
                            {userType}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((mainCategory) => (
                      <React.Fragment key={mainCategory}>
                        <TableRow>
                          <TableCell colSpan={userTypes.length + 1}>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Agrandir",
                                fontSize: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              {mainCategory}
                            </div>
                          </TableCell>
                        </TableRow>
                        {subcategories[mainCategory].map((subcategory) => (
                          <TableRow key={subcategory}>
                            <TableCell
                              style={{
                                background: "#f6f9fc",
                                fontSize: "1rem",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: `"Montserrat", sans-serif`,
                                }}
                              >
                                {subcategory}
                              </span>
                            </TableCell>
                            {userTypes.map((userType) => (
                              <TableCell
                                key={userType}
                                align="center"
                                style={{ background: "#f6f9fc" }}
                              >
                                {pricingUserData[userType][mainCategory][
                                  subcategory
                                ] ? (
                                  <IconButton color="primary" aria-label="True">
                                    <CheckIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton color="error" aria-label="False">
                                    <CloseIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      {userTypes.map((userType) => (
                        <TableCell key={userType}>
                          <button
                            className="portal-btn"
                            onClick={() => {
                              userType === "Agent"
                                ? window.open(
                                    "https://agent.comfortfinancialsolutions.com/signup",
                                    "_blank"
                                  )
                                : navigate(paths.subscriberRegistration);
                            }}
                            style={{ fontSize: "1rem", minWidth: "94px" }}
                          >
                            Join as {userType}
                          </button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Pricing;
