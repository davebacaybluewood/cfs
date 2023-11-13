import React, { useState } from "react";
import { Alert, Drawer } from "@mui/material";
import Pricing from "../Pricing/Pricing";
import "./DaysIndicator.scss";

interface DaysIndicatorProps {
  text: string;
}
const DaysIndicator: React.FC<DaysIndicatorProps> = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="days-indicator-container">
      <Alert severity="info">
        <span>
          {props.text}
          <button onClick={() => setOpenDrawer(true)}>
            Click here to upgrade to agent pro
          </button>
        </span>
      </Alert>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Pricing />
      </Drawer>
    </div>
  );
};

export default DaysIndicator;
