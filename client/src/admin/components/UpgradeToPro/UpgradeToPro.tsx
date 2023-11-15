import React, { useState } from "react";
import "./UpgradeToPro.scss";
import { FaCrown } from "react-icons/fa";
import useUserRole from "hooks/useUserRole";
import { Drawer } from "@mui/material";
import Pricing from "../Pricing/Pricing";

const UpgradeToPro: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isAdmin, isAgent, loading } = useUserRole();

  if (isAdmin || isAgent || loading) {
    return <React.Fragment />;
  }

  return (
    <div className="upgrade-to-pro-container">
      <button onClick={() => setOpenDrawer(true)}>
        <FaCrown />
        <span>Upgrade to Agent Pro</span>
      </button>

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

export default UpgradeToPro;
