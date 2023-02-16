import { Grid } from "@mui/material";
import React from "react";

const VideoDescription: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={12} lg={12}>
        <div className="video-captions">
          <h2>The Debt Action Plan Program Overview</h2>
          <h3>
            Many thousands of people who are utilizing the Debt Action Plan
            system are sleeping better at night and you could too!
          </h3>
          <h3>Here is how the program works.</h3>
          <p>
            <span>Step 1:</span> Schedule a free discovery session with your
            Debt Action Plan specialist using the calendar on this page. The
            purpose of the discovery session is for you to determine if the
            system will be a viable solution to your debt situation. We take an
            educational approach during this session. So come relaxed and ready
            to ask any questions you’d like, there is nothing for sale.
          </p>
          <h3>Here is what we will accomplish on this first meeting:</h3>
          <ul>
            <li>Discover exactly when you will have all your debts paid.</li>
            <li>Find out how much money you will save.</li>
            <li>Receive a customized Debt Action Plan report.</li>
          </ul>
        </div>
      </Grid>
    </Grid>
  );
};

export default VideoDescription;
