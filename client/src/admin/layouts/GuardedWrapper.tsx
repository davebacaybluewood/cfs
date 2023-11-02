import adminPathsNew from "admin/constants/routes";
import UserProvider, { UserContext } from "admin/context/UserProvider";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "./Sidebar/Sidebar";
import useGetProfile from "admin/pages/Profile/components/ProfileForm/hooks/useGetProfile";

type GuardedWrapperProps = {
  children: React.ReactNode;
};
const GuardedWrapper: React.FC<GuardedWrapperProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  const localData = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!localData) {
      navigate(adminPathsNew.login);
    }
  }, [localData]);

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
