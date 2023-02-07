import { Paper } from "@mui/material";
import Box from "AdminNew/components/Box/Box";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import AdminSettings from "./components/AdminSettings";
import VideoSettings from "./components/VideoSettings";
import "./Settings.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Settings",
    url: paths.settings,
    isActive: true,
  },
];

const Settings: React.FC = () => {
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="setting-container"
    >
      <Box>
        <Paper>
          <div className="setting">
            <Title
              title="Video Settings"
              subtitle="Configure your personal page settings."
            />
            <VideoSettings />
          </div>
          <div className="setting">
            <Title
              title="Admin Settings"
              subtitle="Configure your admin settings."
            />
            <AdminSettings />
          </div>
        </Paper>
      </Box>
    </Wrapper>
  );
};

export default Settings;
