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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./Pricing.scss";

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
  return (
    <React.Fragment>
      <div className="pricing">
        <Banner
          bigTitle="Pricing"
          title="Explore our insurance plans and affordable pricing"
          hasBorder={true}
        />
        <div>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={10} lg={8}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h4"></Typography>
                      </TableCell>
                      {userTypes.map((userType) => (
                        <TableCell key={userType} align="center">
                          <Typography variant="h4">
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
                              style={{ fontWeight: "bold", fontSize: "18px" }}
                            >
                              {formatCategoryLabel(mainCategory)}
                            </div>
                          </TableCell>
                        </TableRow>
                        {subcategories[mainCategory].map((subcategory) => (
                          <TableRow key={subcategory}>
                            <TableCell style={{ fontSize: "14px" }}>
                              {formatCategoryLabel(subcategory)}
                            </TableCell>
                            {userTypes.map((userType) => (
                              <TableCell key={userType} align="center">
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
                          <button className="portal-btn">Join</button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pricing;
