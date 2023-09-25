import Banner from "library/Banner/Banner";
import React from "react";
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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./Pricing.scss";
import Button from "library/Button/Button";
import { useNavigate } from "react-router-dom";
import { BsChevronDoubleRight } from "react-icons/bs";
import { paths } from "constants/routes";

const pricingUserData = {
  subscriber: {
    mainFeatures: {
      financeNewsAndUpdates: true,
      articlesAndBlogs: true,
      trainingAndWebinars: true,
      onsiteNetworkingEvents: false,
      awardsAndRecognition: false,
      preLicensingAssistance: false,
      postLicensingAssistance: false,
    },
    CFSToolsAndSystems: {
      registrationAndAccountManagementDashboard: false,
      personalWebpage: false,
      appointmentSystem: false,
    },
    clientCareHub: {
      CFSEmailEditor: false,
      CFSLeadGenerationSystem: false,
    },
    CFSContentLibrary: {
      socialMediaMaterials: false,
      emailTemplate: false,
    },
    advanceTraining: {
      corporateTraining: false,
      systemsTraining: false,
      productTraining: false,
      marketingTraining: false,
      salesTraining: false,
      continueingClasses: false,
    },
  },
  agent: {
    mainFeatures: {
      financeNewsAndUpdates: true,
      articlesAndBlogs: true,
      trainingAndWebinars: true,
      onsiteNetworkingEvents: true,
      awardsAndRecognition: true,
      preLicensingAssistance: true,
      postLicensingAssistance: true,
    },
    CFSToolsAndSystems: {
      registrationAndAccountManagementDashboard: true,
      personalWebpage: true,
      appointmentSystem: true,
    },
    clientCareHub: {
      CFSEmailEditor: true,
      CFSLeadGenerationSystem: true,
    },
    CFSContentLibrary: {
      socialMediaMaterials: false,
      emailTemplate: false,
    },
    advanceTraining: {
      corporateTraining: false,
      systemsTraining: true,
      productTraining: true,
      marketingTraining: true,
      salesTraining: true,
      continueingClasses: false,
    },
  },
};

const categories: string[] = [
  "mainFeatures",
  "CFSToolsAndSystems",
  "clientCareHub",
  "CFSContentLibrary",
  "advanceTraining",
];

const userTypes: string[] = ["agent", "subscriber"];

const subcategories: { [key: string]: string[] } = {
  mainFeatures: [
    "financeNewsAndUpdates",
    "articlesAndBlogs",
    "trainingAndWebinars",
    "onsiteNetworkingEvents",
    "awardsAndRecognition",
    "preLicensingAssistance",
    "postLicensingAssistance",
  ],
  CFSToolsAndSystems: [
    "registrationAndAccountManagementDashboard",
    "personalWebpage",
    "appointmentSystem",
  ],
  clientCareHub: ["CFSEmailEditor", "CFSLeadGenerationSystem"],
  CFSContentLibrary: ["socialMediaMaterials", "emailTemplate"],
  advanceTraining: [
    "corporateTraining",
    "systemsTraining",
    "productTraining",
    "marketingTraining",
    "salesTraining",
    "continueingClasses",
  ],
};

const formatCategoryLabel = (label: string) => {
  return label
    .split(/(?=[A-Z])/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="pricing-wrapper">
      <Banner
        bigTitle="Pricing"
        title="Explore our insurance plans and affordable pricing"
        hasBorder={true}
      />

      <Container>
        <div className="header">
          <h1>
            Pricing built <br />
            for amazing agents.
          </h1>
        </div>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <div className="pricing-card pricing-card-light">
              <Grid container spacing={2} alignItems="center">
                <Grid item md={7}>
                  <div className="card-captions">
                    <h3>Subscriber</h3>
                    <p>
                      Access a complete payments platform with simple,
                      pay-as-you-go pricing. No setup fees, monthly fees, or
                      hidden fees.
                    </p>
                    <Button
                      variant="danger"
                      onClick={() => navigate(paths.subscriberRegistration)}
                    >
                      Get Started <BsChevronDoubleRight />
                    </Button>
                  </div>
                </Grid>
                <Grid item md={5} alignContent="center" textAlign="center">
                  <div className="price">
                    <h5>FREE</h5>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={6}>
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
                    >
                      Get Started <BsChevronDoubleRight />
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
          <Grid item xs={12} md={10} lg={12}>
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
                          {formatCategoryLabel(userType)}
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
                            {formatCategoryLabel(mainCategory)}
                          </div>
                        </TableCell>
                      </TableRow>
                      {subcategories[mainCategory].map((subcategory) => (
                        <TableRow key={subcategory}>
                          <TableCell
                            style={{ fontSize: "14px", background: "#f6f9fc" }}
                          >
                            <span
                              style={{ fontFamily: `"Montserrat", sans-serif` }}
                            >
                              {formatCategoryLabel(subcategory)}
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
                        <button
                          className="portal-btn"
                          onClick={() => {
                            userType === "agent"
                              ? window.open(
                                  "https://agent.comfortfinancialsolutions.com/signup",
                                  "_blank"
                                )
                              : navigate(paths.subscriberRegistration);
                          }}
                        >
                          Join as {userType === "agent" ? "an" : "a"}{" "}
                          <span>{userType}</span>
                        </button>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Pricing;
