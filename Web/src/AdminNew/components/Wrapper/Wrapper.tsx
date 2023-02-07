import { Avatar, Badge, IconButton, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import React, { memo } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { stringAvatar } from "helpers/stringAvatar";
import { logout } from "redux/actions/userActions";
import { useDispatch } from "react-redux";
import "./Wrapper.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FaRegWindowClose, FaUser } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { notificationsLabel } from "./helpers";
import useAnchor from "./hooks/useAnchor";
import useAccountValidation from "AdminNew/hooks/useAccountValidation";

type WrapperProps = {
  breadcrumb: {
    title: string;
    link?: string;
  }[];
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: boolean;
};
const Wrapper: React.FC<WrapperProps> = (props) => {
  useAccountValidation();
  const wrapperClassnames = classNames("admin-cfs-wrapper", props.className);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout() as any);
  };

  const { avatarHandler, anchorEl, open, handleClose } = useAnchor();

  return (
    <div className={wrapperClassnames}>
      <div className="admin-top-nav">
        <Breadcrumb crumbs={props.breadcrumb} />
        <div className="top-nav-menus">
          {/* <IconButton
            aria-label={notificationsLabel(5)}
            className="notification-button"
          >
            <Badge badgeContent={0} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-label={notificationsLabel(5)}
            className="notification-button"
          >
            <Badge badgeContent={0} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Avatar
            {...stringAvatar("Dave Bacay")}
            onClick={avatarHandler as any}
            className="top-nav-avatar menu-item"
          />

          <Menu
            className="top-nav-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <FaUser />
              <span className="menu-sublinks">Profile</span>
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
              <FaRegWindowClose />
              <span className="menu-sublinks">Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
      {props.error ? <Error /> : props.loading ? <Spinner /> : props.children}
    </div>
  );
};

export default memo(Wrapper);
