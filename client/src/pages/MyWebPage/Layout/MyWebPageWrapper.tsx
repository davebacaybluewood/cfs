import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "./MyWebPageWrapper.scss";
import Spinner from "library/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";

interface MyWebPageWrapperProps {
  showNavBar: boolean;
  showFooter: boolean;
  children: React.ReactNode;
  loading?: boolean;
}

const MyWebPageWrapper: React.FC<MyWebPageWrapperProps> = (props) => {
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    const isLoggedIn = () => {
      if (!userInfo) {
        navigate(paths.login);
      }
    };
    isLoggedIn();
  }, [userInfo]);

  const navigate = useNavigate();
  return (
    <div className="my-webpage-wrapper">
      {/* <div className="navbar">{props.showNavBar ? <Navbar /> : null}</div> commented for future use*/}
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
