import React from "react";
import Navbar from "./Navbar/Navbar";
import "./MyWebPageWrapper.scss";
import Footer from "layout/Footer/Footer";

interface MyWebPageWrapperProps {
  showNavBar: boolean;
  showFooter: boolean;
  children: React.ReactNode;
}

const MyWebPageWrapper: React.FC<MyWebPageWrapperProps> = (props) => {
  return (
    <div className="my-webpage-wrapper">
      <div className="navbar">{props.showNavBar ? <Navbar /> : null}</div>
      <main className="mywebpage-content">{props.children}</main>
      <div className="footer">{props.showFooter ? <Footer /> : null}</div>
    </div>
  );
};
MyWebPageWrapper.defaultProps = {
  showNavBar: true,
  showFooter: true,
};

export default MyWebPageWrapper;
