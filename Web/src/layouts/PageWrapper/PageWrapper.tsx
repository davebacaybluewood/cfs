import classNames from "classnames";
import Footer from "layouts/Footer/Footer";
import Navbar from "layouts/Navbar/Navbar";
import React from "react";

interface IPageWrapper {
  showNavbar?: boolean;
  showFooter?: boolean;
  component: JSX.Element;
}
const PageWrapper: React.FC<IPageWrapper> = (props) => {
  const wrapperClassname = classNames({
    "has-margin-top": false,
  });

  return (
    <div className={wrapperClassname}>
      {props.showNavbar && <Navbar />}
      {props.component}
      {props.showFooter && <Footer />}
    </div>
  );
};

PageWrapper.defaultProps = {
  showNavbar: true,
  showFooter: true,
};
export default PageWrapper;
