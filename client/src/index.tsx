import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home/Home";
import BusinessProtection from "pages/BusinessProtection/BusinessProtection";
import FamilyProtection from "pages/FamilyProtection/FamilyProtection";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-protection" element={<BusinessProtection />} />
        <Route path="/family-protection" element={<FamilyProtection />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
