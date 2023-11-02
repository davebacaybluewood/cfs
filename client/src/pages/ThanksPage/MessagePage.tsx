import React from "react";
import "./MessagePage.scss";
import { Container } from "@mui/material";

const MessagePage: React.FC = () => {
  return (
    <Container>
      <div className="message-page-container">
        <h2>Unsubscribe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <img src="/assets/images/templates/logout-img.png" alt="" />
        <div className="message-captions">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id odio
          omnis ratione commodi cumque nisi amet maiores atque rem!
        </div>
      </div>
    </Container>
  );
};

export default MessagePage;
