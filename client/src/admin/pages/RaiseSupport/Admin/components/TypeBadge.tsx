import { useState, useEffect } from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import InfoIcon from "@mui/icons-material/Info";
// constants
import { SUPPORT_TYPE } from "constants/constants";

// custom badge component
// used tailwind colors pallete for this
const TypeBadge = ({ type }: { type: string }) => {
  const [badgeColor, setBadgeColor] = useState({
    bgColor: "#F1F2F4",
    textColor: "#565D6B",
  });

  // set badge color when type state renders
  useEffect(() => {
    if (type === SUPPORT_TYPE.BUG) {
      // RED
      setBadgeColor({ bgColor: "#FECACA", textColor: "#DC2626" });
    } else if (type === SUPPORT_TYPE.FEATURE) {
      // YELLOW
      setBadgeColor({ bgColor: "#FEF3C7", textColor: "#D97706" });
    } else {
      // LIGHT GRAY
      setBadgeColor({
        bgColor: "#F1F2F4",
        textColor: "#565D6B",
      });
    }
  }, [type]);

  return (
    <span
      className="type-badge"
      style={{
        background: badgeColor.bgColor,
        color: badgeColor.textColor,
      }}
    >
      {/* Conditionally render badge */}
      {type === SUPPORT_TYPE.BUG && <BugReportIcon />}
      {type === SUPPORT_TYPE.FEATURE && <SettingsSuggestIcon />}
      {type === SUPPORT_TYPE.OTHER && <InfoIcon />}

      {type}
    </span>
  );
};

export default TypeBadge;
