import { paths } from "constants/routes";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutOnClose: React.FC = () => {
	const navigate = useNavigate();

	const userData = localStorage.getItem("userInfo");

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			localStorage.removeItem("userInfo");
			if (!userData) {
				navigate(paths.login);
			}
			e.preventDefault();
			e.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return null;
};

export default LogoutOnClose;
