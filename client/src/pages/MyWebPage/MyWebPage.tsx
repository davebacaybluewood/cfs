import React from "react";
import MyWebPageWrapper from "./Layout/MyWebPageWrapper";
import { Container } from "@mui/material";

const MyWebPage: React.FC = () => {
  return (
    <MyWebPageWrapper showNavBar showFooter>
      <Container>
        <h2>WebPage</h2>
      </Container>
    </MyWebPageWrapper>
  );
};

export default MyWebPage;
