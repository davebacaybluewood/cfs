import React, { useState } from "react";
import MyWebPageWrapper from "./Layout/MyWebPageWrapper";
import { Container, Grid } from "@mui/material";
import "./MyWebPage.scss";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";
import {
	FaFacebook,
	FaLinkedin,
	FaLocationArrow,
	FaSearchLocation,
	FaTwitter,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

const MyWebPage: React.FC = () => {
	const userGuid = "5edf7ff2-8274-481b-a294-5db26592a81f"; //Static, not final
	const { profile, loading } = useFetchUserProfile(userGuid);

	const defaultAvatar =
		"https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";

	const avatar =
		profile?.avatar.toString() === "" || loading
			? defaultAvatar
			: profile?.avatar.toString();

	const fullName = `${profile?.firstName} ${profile?.lastName}`;

	const links = [
		{
			icon: <HiLocationMarker />,
			title:
				profile?.address.toString() === ""
					? "Profile Address"
					: profile?.address.toString(),
		},
		{
			icon: <FaFacebook />,
			title: profile?.facebook.toString(),
		},
		{
			icon: <FaLinkedin />,
			title: profile?.linkedIn.toString(),
		},
		{
			icon: <FaTwitter />,
			title: profile?.linkedIn.toString(),
		},
	];

	if (loading) {
		<Spinner variant="relative" />;
	}

	return (
		<MyWebPageWrapper showNavBar showFooter>
			<div className="my-webpage-container">
				<div className="half-bg" />
				<Container>
					<div className="profile-section-container">
						{loading ? (
							<Spinner variant="fixed" />
						) : (
							<Grid container spacing={2}>
								<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
									<img src={avatar} alt={avatar} />
								</Grid>
								<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
									<div className="profile-captions">
										<h2>{fullName}</h2>
										<p className="agent-description">
											Lorem ipsum dolor sit amet.
										</p>
										<div className="social-container">
											{links.map((item) => (
												<div>
													{item.icon} <span>{item.title}</span>
												</div>
											))}
										</div>
									</div>
								</Grid>
							</Grid>
						)}
					</div>
				</Container>
			</div>
		</MyWebPageWrapper>
	);
};

export default MyWebPage;
