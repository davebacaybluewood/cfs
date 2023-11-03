import adminPathsNew from "admin/constants/routes";
import UserProvider from "admin/context/UserProvider";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "./Sidebar/Sidebar";
import useAutoLogoutOnClose from "hooks/useAutoLogoutOnClose";
import { useDispatch } from "react-redux";
import { logout } from "redux/actions/userActions";
import LogoutOnClose from "helpers/LogoutOnClose";

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

	// const dispatch = useDispatch();

	// const handleLogout = () => {
	// 	dispatch(logout as any);
	// };

	// useAutoLogoutOnClose(handleLogout);

	return (
		<UserProvider>
			<LogoutOnClose />
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
