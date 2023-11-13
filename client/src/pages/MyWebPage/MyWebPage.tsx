import React, { useState } from "react";
import MyWebPageWrapper from "./Layout/MyWebPageWrapper";
import { Container, Grid } from "@mui/material";
import "./MyWebPage.scss";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";
import { FaFacebook, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Button from "library/Button/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import { MAIN_IMAGES } from "constants/constants";

const MyWebPage: React.FC = () => {
	const userGuid = "c29875fc-d064-46ca-8b00-507ef315c62f"; //Static, not final
	const { profile, loading } = useFetchUserProfile(userGuid);

	const navigate = useNavigate();

	/* Agent Information */
	const defaultAvatar =
		"https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";
	const avatar =
		profile?.avatar.toString() === "" || loading
			? defaultAvatar
			: profile?.avatar.toString();
	const fullName = `${profile?.firstName} ${profile?.lastName}`;
	const address =
		profile?.state?.toString() === ""
			? /* "Profile Address" not final*/ "Paul and Mary Moore, 1313 E Main St, Portage MI 49024-2001" //Not Final, for testing purposes
			: profile?.state?.toString();
	const facebook =
		profile?.facebook.toString() === ""
			? "Facebook"
			: profile?.facebook.toString();
	const linkedIn =
		profile?.linkedIn.toString() === ""
			? "LinkedIn"
			: profile?.linkedIn.toString();
	const twitter =
		profile?.twitter.toString() === ""
			? "Twitter"
			: profile?.twitter.toString();
	const phoneNumber = profile?.phoneNumber.toString();
	const email = profile?.emailAddress;

	const links = [
		{
			icon: <HiLocationMarker />,
			title: address,
		},
		{
			icon: <FaFacebook />,
			title: facebook,
		},
		{
			icon: <FaLinkedin />,
			title: linkedIn,
		},
		{
			icon: <FaTwitter />,
			title: twitter,
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
									<img src={defaultAvatar} alt={defaultAvatar} />
								</Grid>
								<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
									<div className="profile-captions">
										<h2>{fullName}</h2>
										<p className="agent-description">{profile?.bio}</p>
										<div className="social-container">
											{links.map((item) => (
												<div className="social-content">
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
				<div className="tri-col">
					<Container>
						<Grid container spacing={2}>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div className="left-col">
									<div className="contact">
										<FaPhone /> <span>{phoneNumber}</span>
									</div>
									<div className="contact">
										<MdEmail />{" "}
										<span>
											<a href={`mailto:${email}`} className="mailto">
												{email}
											</a>
										</span>
									</div>
									<Button variant="primary">
										{" "}
										<BsChatRightTextFill /> <span>Chat</span>{" "}
									</Button>
								</div>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<div className="middle-col">
									<div className="middle-col-content">
										<h2>Main Feed</h2>
									</div>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div className="right-col">
									<div className="right-col-content">
										<h3>Agent Calculator</h3>
										<div className="icon-holder">
											<BsCalculator />
										</div>
										<p>Lorem ipsum dolor sit.</p>
										<Button onClick={() => navigate("/calculator")}>
											Calculate{" "}
											<span>
												<AiOutlineArrowRight />
											</span>
										</Button>
									</div>
								</div>
							</Grid>
						</Grid>
					</Container>
				</div>
			</div>
		</MyWebPageWrapper>
	);
};

export default MyWebPage;
