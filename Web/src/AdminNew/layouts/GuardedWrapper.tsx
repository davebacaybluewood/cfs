import classNames from "classnames";
import paths from "constants/routes";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (!userInfo) {
      navigate(paths.login);
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
    <div className={adminClassnames}>
      <AdminSidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <main>{props.children}</main>
    </div>
  );
};

export default GuardedWrapper;
