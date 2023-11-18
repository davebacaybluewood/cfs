import React from "react";
import "./MyWebPageWrapper.scss";
import Spinner from "library/Spinner/Spinner";

interface MyWebPageWrapperProps {
  showNavBar: boolean;
  showFooter: boolean;
  children: React.ReactNode;
  loading?: boolean;
}

const MyWebPageWrapper: React.FC<MyWebPageWrapperProps> = (props) => {
  return (
    <div className="my-webpage-wrapper">
      {/* <div className="navbar">{props.showNavBar ? <Navbar /> : null}</div>{" "} */}
      {/**commented for future use */}
      <main className="mywebpage-content">{props.children}</main>
      <div className="footer">
        {props.showFooter ? (
          /* <Footer/> */ <h2 style={{ textAlign: "center" }}></h2> //Not final
        ) : null}
      </div>
      {props.loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};
MyWebPageWrapper.defaultProps = {
  showNavBar: true,
  showFooter: true,
};

export default MyWebPageWrapper;