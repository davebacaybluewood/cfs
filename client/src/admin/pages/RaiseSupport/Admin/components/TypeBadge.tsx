import { useState, useEffect } from "react"
import BugReportIcon from "@mui/icons-material/BugReport"
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import InfoIcon from "@mui/icons-material/Info"

// custom badge component
// used tailwind colors pallete for this
const TypeBadge = ({ type }: { type: string }) => {
  const [badgeColor, setBadgeColor] = useState({
    bgColor: "#F1F2F4",
    textColor: "#565D6B",
  })

  // set badge color when type state renders
  useEffect(() => {
    if (type.includes("bug")) {
      // RED
      setBadgeColor({ bgColor: "#FECACA", textColor: "#DC2626" })
    } else if (type.includes("feature")) {
      // YELLOW
      setBadgeColor({ bgColor: "#FEF3C7", textColor: "#D97706" })
    } else {
      // LIGHT GRAY
      setBadgeColor({
        bgColor: "#F1F2F4",
        textColor: "#565D6B",
      })
    }
  }, [type])

  return (
    <span
      className="type-badge"
      style={{
        background: badgeColor.bgColor,
        color: badgeColor.textColor,
      }}
    >
      {/* Conditionally render badge */}
      {type.includes("bug") && <BugReportIcon />}
      {type.includes("feature") && <SettingsSuggestIcon />}
      {type.includes("other") && <InfoIcon />}

      {type}
    </span>
  )
}

export default TypeBadge
