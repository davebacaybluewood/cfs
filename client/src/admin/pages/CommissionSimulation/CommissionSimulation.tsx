import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { Grid } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import FormFourField from "./components/FormFourField";
import FormSixField from "./components/FormSixField";
import { PieChart, Pie } from "recharts";
import "./CommissionSimulation.scss";
import Graph from "./components/Graph";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Commission Simulation",
    url: paths.commissionSimulation,
    isActive: true,
  },
];

interface CommissionSimulation {
  heading: string;
  numMembers: number;
}
const CommissionSimulation: React.FC<CommissionSimulation> = (props) => {
  // Sample data
  const data = [
    { name: "Personal Earnings", revenue: 500 },
    { name: "Spread Earnings", revenue: 500 },
    { name: "Override Earnings", revenue: 500 },
  ];
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="users-container"
    >
      <Title
        title="Commission Simulation"
        subtitle="Compute your commission."
      />
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={6}>
          <div className="admin-calculator">
            <div className="total-block">
              <div className="total-block-heading">
                <h3>{props.heading}</h3>
              </div>
              <div className="total-block-result">
                {/* Left */}
                <div className="result-title">
                  <h2>Monthly</h2>
                </div>
                {/* Right */}
                <div className="result-title">
                  <h2>Annually</h2>
                </div>
              </div>
            </div>
            <div className="number-members">
              <h5>{`${props.numMembers} members`}</h5>
            </div>
            <div className="form-calculator">
              <FormFourField
                heading="Personal"
                description="lorem ipsum dolor sit amet"
                field1="Position"
                field2="Position"
                field3="Monthly Target Premium"
                field4="Monthly Target Premium"
                button={{
                  text: "Add an another field",
                }}
              />
              <FormSixField
                heading="Spread"
                description="lorem ipsum dolor sit amet"
                field1="Position"
                field2="Position"
                field3="Monthly Target Premium"
                field4="Monthly Target Premium"
                field5="# of members"
                field6="# of members"
              />
              <FormSixField
                heading="Generation Override"
                description="lorem ipsum dolor sit amet"
                field1="Gen Number"
                field2="Gen Number"
                field3="Monthly Target Premium"
                field4="Monthly Target Premium"
                field5="# of members"
                field6="# of members"
              />
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Graph />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CommissionSimulation;

// Notes: Please use the following depending on the needs
// 4 fielded card: formFourFielded.jsx
// 6 fielded card: formSixFielded.jsx
