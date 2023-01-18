import classNames from "classnames";
import useResponsive from "hooks/useResponsive";
import React from "react";
import AwesomeLibraryAlias from "react-awesome-slider";
import "./AwesomeSlider.scss";

type AwesomeSliderProps = {
  className: string;
};
const AwesomeSlider: React.FC<AwesomeSliderProps> = (props) => {
  const isMobileMode = useResponsive("mobile");
  const sliderCaptionClassnames = classNames("slider-captions", {
    "slider-captions-mobile": isMobileMode,
  });

  return (
    <AwesomeLibraryAlias
      bullets={false}
      animation="cubeAnimation"
      infinite={true}
      mobileTouch={true}
    >
      <div>
        <div className={sliderCaptionClassnames}>
          <h5>Welcome to Comfort Life Financial</h5>
          <h1>We are creative financial for your life.</h1>
        </div>
        <img
          src="https://techno.dreamitsolution.net/wp-content/uploads/2020/10/slider2.png"
          alt="slider"
        />
      </div>
      <div>
        <div className={sliderCaptionClassnames}>
          <h5>Welcome to Comfort Life Financial</h5>
          <h1>We are creative financial for your life.</h1>
        </div>
        <img
          src="https://techno.dreamitsolution.net/wp-content/uploads/2020/10/slider2.png"
          alt="slider"
        />
      </div>
    </AwesomeLibraryAlias>
  );
};

export default AwesomeSlider;
