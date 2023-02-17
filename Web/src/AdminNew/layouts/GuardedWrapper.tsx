import adminPathsNew from "AdminNew/constants/routes";
import UserProvider from "AdminNew/context/UserProvider";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "./Sidebar/Sidebar";

type GuardedWrapperProps = {
  children: React.ReactNode;
};
const GuardedWrapper: React.FC<GuardedWrapperProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate(adminPathsNew.login);
    }
  }, [userInfo]);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value: any) => {
    setToggled(value);
  };

  const adminClassnames = classNames({
    "admin-wrapper": true,
    toggled: toggled,
  });

  return (
    <UserProvider>
      <div className={adminClassnames}>
        <AdminSidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
        <main>{props.children}</main>
      </div>
      <ToastContainer />
    </UserProvider>
  );
};

export default GuardedWrapper;
