import { ShowChart } from "@mui/icons-material";
import { Grid } from "@mui/material";
import BigBadge, { BigBadgeProps } from "admin/components/BigBadge/BigBadge";
import React from "react";
import { Chart } from "react-google-charts";

interface GraphProps {
  data: any;
  showChart?: boolean;
  badgeData: BigBadgeProps[];
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
      {props.showChart ? (
        <Chart
          chartType="PieChart"
          data={props.data}
          options={options as any}
          width={"100%"}
          height={"400px"}
          style={{
            marginBottom: "30rem",
          }}
        />
      ) : null}
      <Grid container spacing={2}>
        {props.badgeData.map((data) => {
          return (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <BigBadge
                color={data.color}
                title={data.title}
                label1={data.label1}
                value1={data.value1}
                label2={data.label2}
                value2={data.value2}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Graph;
