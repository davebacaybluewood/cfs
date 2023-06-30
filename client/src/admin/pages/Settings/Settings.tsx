import { Paper } from "@mui/material";
import Box from "admin/components/Box/Box";
import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import AdminSettings from "./components/AdminSettings";
import "./Settings.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
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
          {/* <div className="setting">
            <Title
              title="Video Settings"
              subtitle="Configure your personal page settings."
            />
            <VideoSettings />
          </div> */}
          <div className="setting">
            <Title
              title="Portal Settings"
              subtitle="Configure your portal settings."
            />
            <AdminSettings />
          </div>
        </Paper>
      </Box>
    </Wrapper>
  );
};

export default Settings;
