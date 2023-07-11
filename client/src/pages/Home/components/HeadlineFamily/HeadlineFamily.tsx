import Button from "../../../../library/Button/Button";
import React from "react";
import MovingComponent from "react-moving-text";
import { PopupModal } from "react-calendly";
import useScroll from "hooks/useScroll";
import { Typography } from "@mui/material";
import { CALENDLY } from "constants/constants";
import "./HeadlineFamily.scss";

const HeadlineFamily: React.FC = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);

  useScroll();
  return (
    <div className="headline-family">
      <div className="captions">
        <MovingComponent
          type="fadeInFromBottom"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <Typography variant="h2">
            Financial Comfort, <br /> Now and Tomorrow.
          </Typography>
          <div className="headline-home__btn">
            <Button variant="danger" onClick={() => setOpenCalendlyModal(true)}>
              Free Consultation
            </Button>
            {/* <Button variant="default">Learn More</Button> Please disregard, commented for future dev use */}
          </div>
        </MovingComponent>
      </div>
      <PopupModal
        url={CALENDLY.CONSULTATION}
        onModalClose={() => setOpenCalendlyModal(false)}
        open={openCalendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </div>
  );
};

export default HeadlineFamily;
