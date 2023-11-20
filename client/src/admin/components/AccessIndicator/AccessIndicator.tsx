import React, { useState } from "react";
import { Alert, Drawer } from "@mui/material";
import Pricing from "../Pricing/Pricing";
import "./AccessIndicator.scss";

interface AccessIndicatorProps {
  text?: string;
}
const AccessIndicator: React.FC<AccessIndicatorProps> = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="access-indicator-container">
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

AccessIndicator.defaultProps = {
  text: "You have no access to this page.",
};

export default AccessIndicator;
