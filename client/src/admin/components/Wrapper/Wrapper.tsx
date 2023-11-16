import { Avatar, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import React, { memo, useContext, useEffect, useState } from "react";
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
import DaysIndicator from "../DaysIndicator/DaysIndicator";
import useUserRole from "hooks/useUserRole";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import agent from "admin/api/agent";

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
  const [noOfDays, setNoOfDays] = useState(0);
  const wrapperClassnames = classNames("admin-cfs-wrapper", props.className);
  const navigate = useNavigate();
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout() as any);
    navigate(paths.login);
  };

  const { avatarHandler, anchorEl, open, handleClose } = useAnchor();
  const { loading: profileLoading, profile } = useGetProfile();
  const { isFreeTrial } = useUserRole();

  const name = profile?.firstName + " " + profile?.lastName;

  useEffect(() => {
    const fetchData = async () => {
      const res = await agent.TrialSubscription.getTrialNumberOfDays(
        userGuid ?? ""
      );
      setNoOfDays(res.remainingDays);
    };

    fetchData();
  }, [userGuid]);
  return (
    <div className={wrapperClassnames}>
      {isFreeTrial ? (
        <DaysIndicator
          text={`You only have ${noOfDays} days in your free trial.`}
        />
      ) : null}
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
