import { Grid } from "@mui/material";
import BigBadge from "admin/components/BigBadge/BigBadge";
import React from "react";
import { Chart } from "react-google-charts";

interface GraphProps {
  data: any;
}
const Graph: React.FC<GraphProps> = (props) => {
  const options = {
    legend: { position: "none" },
    chartArea: {
      height: 1000,
      width: "100%",
      top: 48,
      left: 48,
      right: 16,
      bottom: 48,
    },
    height: 700,
    width: "100%",
    backgroundColor: "transparent",
    is3D: true,
    colors: ["#45bf94", "#3f7ec0", "#ecc10c"],
  };

  return (
    <React.Fragment>
      <Chart
        chartType="PieChart"
        data={props.data}
        options={options as any}
        width={"100%"}
        height={"400px"}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <BigBadge
            color="#45bf94"
            title="Personal Earnings"
            label1="MONTHLY"
            value1={`$100.00`}
            label2="ANNUALY"
            value2={`$500.00`}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <BigBadge
            color="#ecc10c"
            title="Spread Earnings"
            label1="MONTHLY"
            value1={`$100.00`}
            label2="ANNUALY"
            value2={`$500.00`}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <BigBadge
            color="#3f7ec0"
            title="Generation Override"
            label1="MONTHLY"
            value1={`$100.00`}
            label2="ANNUALY"
            value2={`$500.00`}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Graph;
