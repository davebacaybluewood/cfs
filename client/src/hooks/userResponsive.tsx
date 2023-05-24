import { useMediaQuery } from "react-responsive";

type DeviceTypes = "mobile" | "desktop";

const VIEW_SIZES = {
  MAX_MOBILE_WIDTH: 900,
  MAX_DESKTOP_WIDTH: 1200,
};

const useResponsive = (deviceType: DeviceTypes) => {
  const isMobileMode = useMediaQuery({
    query: `(max-width: ${VIEW_SIZES.MAX_MOBILE_WIDTH}px)`,
  });
  const isDesktopMode = useMediaQuery({
    query: `(max-width: ${VIEW_SIZES.MAX_DESKTOP_WIDTH}px)`,
  });

  switch (deviceType) {
    case "desktop":
      return isDesktopMode;
    case "mobile":
      return isMobileMode;
  }
};

export default useResponsive;
