import { Avatar, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import React, { memo } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { stringAvatar } from "helpers/stringAvatar";
import { logout } from "redux/actions/userActions";
import { useDispatch } from "react-redux";
import "./Wrapper.scss";
import { FaRegWindowClose, FaUser } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import useAnchor from "./hooks/useAnchor";
import useAccountValidation from "admin/hooks/useAccountValidation";
import useGetProfile from "admin/pages/Profile/components/ProfileForm/hooks/useGetProfile";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";

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
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout() as any);
    navigate(paths.login);
  };

  const { avatarHandler, anchorEl, open, handleClose } = useAnchor();
  const { loading: profileLoading, profile } = useGetProfile();

  const name = profile?.firstName + " " + profile?.lastName;

  return (
    <div className={wrapperClassnames}>
      <div className="admin-top-nav">
        <Breadcrumb crumbs={props.breadcrumb} />
        <div className="top-nav-menus">
          <Avatar
            {...stringAvatar(name, profileLoading)}
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
            <MenuItem onClick={() => navigate(paths.profile)}>
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
