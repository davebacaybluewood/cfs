import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home/Home";
import BusinessProtection from "pages/BusinessProtection/BusinessProtection";
import FamilyProtection from "pages/FamilyProtection/FamilyProtection";
import ROUTES from "constants/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.INDEX} element={<Home key="index-page" />} />
        <Route path={ROUTES.HOME} element={<Home key="home-page" />} />
        <Route path={ROUTES.FAMILY_PROTECTION} element={<FamilyProtection />} />
        <Route
          path={ROUTES.BUSINESS_PROTECTION}
          element={<BusinessProtection />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
