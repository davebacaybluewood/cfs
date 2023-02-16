import { Button } from "@mui/material";
import React from "react";

const AgentPending: React.FC = () => {
  return (
    <div className="agent-pending-wrapper">
      <div>
        <img
          src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1675209170/other-assets/undraw_Happy_feeling_re_e76r_zsud5u.png"
          alt="success"
        />
      </div>
      <div>
        <h2>Your Account is not activated</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default AgentPending;
