import { useState, useEffect } from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import InfoIcon from "@mui/icons-material/Info";
import classNames from "classnames";
// constants
import { SUPPORT_TYPE } from "constants/constants";

// custom badge component
// used tailwind colors pallete for this
const TypeBadge = ({ type }: { type: string }) => {
  const badgeClasses = classNames("span", {
    "badge-feature": type === SUPPORT_TYPE.FEATURE,
    "badge-bug": type === SUPPORT_TYPE.BUG,
    "badge-other": type === SUPPORT_TYPE.OTHER,
  });

  return (
    <span className={`type-badge ${badgeClasses}`}>
      {/* Conditionally render badge */}
      {type === SUPPORT_TYPE.BUG && <BugReportIcon />}
      {type === SUPPORT_TYPE.FEATURE && <SettingsSuggestIcon />}
      {type === SUPPORT_TYPE.OTHER && <InfoIcon />}

      {type}
    </span>
  );
};

export default TypeBadge;
