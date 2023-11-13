import React from "react";
import "./UpgradeToPro.scss";
import { FaCrown } from "react-icons/fa";
import useUserRole from "hooks/useUserRole";

const UpgradeToPro: React.FC = () => {
  const { isAdmin, isAgent, loading } = useUserRole();

  if (isAdmin || isAgent || loading) {
    return <React.Fragment />;
  }

  return (
    <div className="upgrade-to-pro-container">
      <button>
        <FaCrown />
        <span>Upgrade to Agent Pro</span>
      </button>
    </div>
  );
};

export default UpgradeToPro;
