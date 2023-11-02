import React from "react";
import "./MessagePage.scss";
import { Container } from "@mui/material";

const MessagePage: React.FC = () => {
  return (
    <Container>
      <div className="message-page-container">
        <img src="/assets/images/templates/logout-img.png" alt="" />
        <div className="message-captions">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus
          illum ullam, natus necessitatibus ipsa sapiente architecto, maxime
          corrupti repudiandae pariatur eius ex assumenda optio? Sit sed quam
          sapiente ipsam necessitatibus illum. Blanditiis fuga aliquam quidem
          nesciunt, temporibus accusamus soluta rem mollitia. Rerum, eaque
          praesentium ratione minus porro nam libero. Corrupti at nostrum in ea
          ad. Voluptates obcaecati cumque doloribus, delectus sit facere, magnam
          voluptas soluta rem corporis placeat rerum necessitatibus eligendi
          corrupti a accusantium, harum repellat blanditiis animi! Error nostrum
          quidem ab quis repellendus omnis obcaecati, praesentium commodi nemo
          qui, nihil, sint autem deserunt. Magnam debitis laudantium itaque
          cupiditate deserunt.
        </div>
      </div>
    </Container>
  );
};

export default MessagePage;
