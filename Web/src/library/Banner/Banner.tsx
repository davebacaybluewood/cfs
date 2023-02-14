import React from "react";
import "./Banner.scss";

interface BannerProps extends React.HTMLProps<HTMLDivElement> {
  isVisible?: boolean;
  title: string;
  bigTitle: string;
  hasBorder?: boolean;
  backgroundImage?: string;
  children?: React.ReactNode;
}
const Banner: React.FC<BannerProps> = (props) => {
  if (!props.isVisible) {
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      <div
        className="banner"
        style={{ backgroundImage: `url(${props.backgroundImage})` }}
      >
        <h5>{props.title}</h5>
        <h1>{props.bigTitle}</h1>
        {props.children}
        {props.hasBorder && <div className="divider" />}
      </div>
    </React.Fragment>
  );
};

Banner.defaultProps = {
  isVisible: true,
};

export default Banner;
