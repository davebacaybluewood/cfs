import React from "react";  
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "layout/Wrapper/Wrapper";
import { Provider } from "react-redux";
import store from "store";
import "./styles/main.scss";
import "./styles/colors.scss";
import "react-multi-carousel/lib/styles.css";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { REACT_ROUTES } from "constants/constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render( 
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {REACT_ROUTES.map((route, index) => (
            <Route
              key={index}
              {...route}
              path={route.path}
              element={
                <Wrapper
                  key={index}
                  showHeadline={route.showHeadline}
                  showNavbar={route.showNavbar}
                  showFooter={route.showFooter}
                  theme={route.theme}
                  showPartners={route.showPartners}
                >
                  {route.element}
                </Wrapper>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
