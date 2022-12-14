import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { IMAGES, MAIN_CALENDLY_EVENT_LINK } from "constants/constants";
import Topnav from "./components/Topnav/Topnav";
import { Button, Container } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Drawer } from "@mui/material";
import useResponsive from "hooks/useResponsive";
import paths from "constants/routes";
import { PopupModal } from "react-calendly";
import SocialIcons from "./components/Topnav/SocialIcons";

const Navbar: React.FC = () => {
  const url = window.location.href;
  const currentPage = url.split("/")[3];
  const [openDrawer, setDrawer] = useState(false);
  const isMobileMode = useResponsive("mobile");
  const [calendlyModal, setCalendlyModal] = useState(false);
  const navigate = useNavigate();

  const changeLink = (url: string) => {
    navigate(url);
    setDrawer(false);
  };
  const navLinks = [
    {
      className: "nav-item",
      linkProps: {
        className: `nav-links ${
          currentPage === paths.home.substring(1) || currentPage === ""
            ? "nav-links-active"
            : ""
        }`,
        to: paths.home,
        text: "Home",
      },
      dropdown: false,
    },
    {
      className: "nav-item",
      linkProps: {
        className: `nav-links ${
          currentPage === paths.events.substring(1) ? "nav-links-active" : ""
        }`,
        to: paths.events,
        text: "Events",
      },
      dropdown: false,
    },
    {
      className: "nav-item",
      linkProps: {
        className: `nav-links ${
          currentPage === paths.about.substring(1) ? "nav-links-active" : ""
        }`,
        to: paths.about,
        text: "About Us",
      },
      dropdown: false,
    },
    {
      className: "nav-item",
      linkProps: {
        className: `nav-links ${
          currentPage === paths.contact.substring(1) ? "nav-links-active" : ""
        }`,
        to: paths.contact,
        text: "Contact",
      },
      dropdown: false,
    },
    {
      className: "nav-item",
      linkProps: {
        className: `nav-links ${
          currentPage === paths.solutions.substring(1) ? "nav-links-active" : ""
        }`,
        to: paths.solutions,
        text: "Solutions",
      },
      dropdown: false,
    },
    {
      className: "nav-item",
      linkProps: {
        className: `nav-links ${
          currentPage === paths.portal.substring(1) ? "nav-links-active" : ""
        }`,
        to: paths.portal,
        text: "Agent Portal",
      },
      dropdown: false,
    },
  ];

  return (
    <React.Fragment>
      <Topnav />
      <nav className="navbar">
        <Container className="container-navbar">
          <Link to="/" className="navbar-logo">
            <img
              src={IMAGES.COMPANY_LOGOS.MAIN}
              alt={IMAGES.COMPANY_LOGOS.MAIN}
            />
          </Link>
          {!isMobileMode && (
            <ul className="nav-links">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link {...link.linkProps}>{link.linkProps.text}</Link>
                </li>
              ))}
              <li
                className="highlight-button"
                onClick={() => setCalendlyModal(true)}
              >
                TALK TO US
              </li>
            </ul>
          )}
          {isMobileMode && (
            <Button
              onClick={() => setDrawer(true)}
              className="navbar-mobile-button"
            >
              <MenuOpenIcon />
            </Button>
          )}
        </Container>
      </nav>
      {isMobileMode && (
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setDrawer(false)}
          className="nav-links-drawer"
        >
          <ul className="drawer-ul">
            {navLinks.map((link, index) => (
              <li key={index} onClick={() => changeLink(link.linkProps.to)}>
                <Link {...link.linkProps}>{link.linkProps.text}</Link>
              </li>
            ))}
          </ul>
          <SocialIcons className="mobile-icons" />
        </Drawer>
      )}
      <PopupModal
        url={MAIN_CALENDLY_EVENT_LINK}
        onModalClose={() => setCalendlyModal(false)}
        open={calendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </React.Fragment>
  );
};

export default Navbar;
