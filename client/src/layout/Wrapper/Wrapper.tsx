import Footer from "layout/Footer/Footer";
import Navbar from "layout/Navbar/Navbar";
import MainHeadline from "pages/Home/components/Main-Headline/MainHeadline";
import React from "react";
import { ToastContainer } from "react-toastify";

interface WrapperProps {
  showFooter?: boolean;
  showNavbar?: boolean;
  showHeadline?: boolean;
  children: React.ReactNode | JSX.Element;
  theme?: "SKY" | "RED" | "NAVY";
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <React.Fragment>
      <div className="main-wrapper">
        {props.showNavbar ? <Navbar theme={props.theme} /> : null}

        <main>{props.children}</main>

        {props.showHeadline ? <MainHeadline /> : null}
        {props.showFooter ? <Footer /> : null}
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

Wrapper.defaultProps = {
  showFooter: true,
  showNavbar: true,
  showHeadline: true,
  theme: "NAVY",
};

export default Wrapper;
