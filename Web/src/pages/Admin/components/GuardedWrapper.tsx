import { Avatar, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import paths from "constants/routes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "redux/actions/userActions";
import AdminSidebar from "./Sidebar/Sidebar";
import { stringAvatar } from "helpers/stringAvatar";
import Breadcrumb from "./Breadcrumb/Breadcrumb";

type GuardedWrapperProps = {
  children: React.ReactNode;
};
type ICurrentPage = {
  text: string;
  url: string;
};
const GuardedWrapper: React.FC<GuardedWrapperProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [currentPageState, setCurrentPageState] = useState<ICurrentPage>({
    text: "",
    url: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate(paths.login);
    }
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout() as any);
  };

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const avatarHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const url = window.location.href;
  const currentPage = url.split(window.location.host)[1];

  useEffect(() => {
    switch (currentPage) {
      case paths.adminCalendar:
        setCurrentPageState({
          text: "Calendar",
          url: "",
        });
        break;
      case paths.adminAccounts:
        setCurrentPageState({
          text: "Admin Accounts",
          url: "",
        });
        break;
      case paths.adminInquiries:
        setCurrentPageState({
          text: "Customer Inquiries",
          url: paths.adminInquiries,
        });
        break;
      case paths.adminEvents:
        setCurrentPageState({
          text: "Events",
          url: "",
        });
        break;
      case paths.adminEventInvites:
        setCurrentPageState({
          text: "Event Invites",
          url: "",
        });
        break;
      case paths.adminContacts:
        setCurrentPageState({
          text: "Contacts",
          url: "",
        });
        break;
      case paths.adminGraphs:
        setCurrentPageState({
          text: "Graphs",
          url: "",
        });
        break;
      case paths.adminDashboard:
        setCurrentPageState({
          text: "Dashboard",
          url: "",
        });
        break;
      case paths.adminEventsForm:
        setCurrentPageState({
          text: "Events Form",
          url: "",
        });
        break;
    }
  }, [currentPage]);

  const crumbs = [
    {
      title: "Comfort Life Finance Admin",
      url: "",
    },
    {
      title: currentPageState.text,
      url: currentPageState.url,
    },
  ];

  return (
    <div className={adminClassnames}>
      <AdminSidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <main>
        <div className="admin-top-nav">
          <Breadcrumb crumbs={crumbs} />
          <Avatar
            {...stringAvatar("Dave Bacay")}
            onClick={avatarHandler as any}
            className="top-nav-avatar"
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </div>
        {props.children}
      </main>
    </div>
  );
};

export default GuardedWrapper;
