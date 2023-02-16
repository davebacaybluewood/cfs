import { Paper } from "@mui/material";
import React from "react";
import "./BlogsBanner.scss";

const BlogsBanner: React.FC = () => {
  return (
    <Paper elevation={12} variant="outlined" className="blogs-banner-container">
      <h2>COMFORT BLOGS</h2>
    </Paper>
  );
};

export default BlogsBanner;
