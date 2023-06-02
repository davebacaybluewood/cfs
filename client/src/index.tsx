import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { REACT_ROUTES } from "constants/routes";
import Wrapper from "layout/Wrapper/Wrapper";
import "./styles/main.scss";
import "./styles/colors.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {REACT_ROUTES.map((route) => (
          <Route
            {...route}
            path={route.path}
            element={
              <Wrapper
                showHeadline={route.showHeadline}
                showNavbar={route.showNavbar}
                showFooter={route.showFooter}
                theme={route.theme}
              >
                {route.element}
              </Wrapper>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
