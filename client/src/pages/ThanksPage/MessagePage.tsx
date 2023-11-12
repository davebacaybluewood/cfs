import React from "react";
import "./MessagePage.scss";
import { Container } from "@mui/material";
import { MAIN_IMAGES } from "constants/constants";

const MessagePage: React.FC = () => {
	return (
		<Container>
			<div className="message-page-container">
				<div className="message-header">
					<h2>Unsubscribe</h2>
					<img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
				</div>
				<div className="message-page-content">
					<img src="/assets/images/templates/logout-img.png" alt="" />
					<p>
						You have been successfully unsubscribed from our email list. We're
						sorry to see you go, but we respect your decision. If you ever
						change your mind, you can resubscribe at any time. <br /> Thank you
						for being a part of the CFS community
					</p>
				</div>
			</div>
		</Container>
	);
};

export default MessagePage;
