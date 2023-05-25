import React, { useState } from "react";
import NavLinksDesktop from "./components/NavLinksDesktop";
import { Container, SwipeableDrawer, Typography } from "@mui/material";
import { FaBars, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import "./Navbar.scss";
import useResponsive from "hooks/userResponsive";
const Navbar: React.FC = () => {
  const isMobileMode = useResponsive("mobile");
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="navbar">
        <Container>
          <div className="navbar__content">
            <div className="navbar__name">
              <img src="/assets/images/logos/logo-white.png" alt="CFS logo" />
            </div>
            <div className="navbar__links">
              {isMobileMode ? (
                <button
                  onClick={() => setIsMobileNavbarOpen(true)}
                  className="navbar-btn"
                >
                  <FaBars />
                </button>
              ) : (
                <NavLinksDesktop
                  links={[
                    {
                      link: "/",
                      text: "Home",
                      isActive: true,
                    },
                    {
                      link: "/",
                      text: "About Us",
                    },
                    {
                      link: "/",
                      text: "Solutions",
                    },
                    {
                      link: "/",
                      text: "Events",
                    },
                    {
                      link: "/",
                      text: "Resources",
                    },
                    {
                      link: "/",
                      text: "Contact Us",
                    },
                    {
                      link: "/",
                      text: "Agent Portal",
                      isButton: true,
                      className: "navbar__btn_-desktop",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </Container>
        <SwipeableDrawer
          anchor="right"
          open={isMobileNavbarOpen}
          onClose={() => setIsMobileNavbarOpen(false)}
          onOpen={() => setIsMobileNavbarOpen(false)}
        >
          <div className="navbar__mobile">
            <div className="navbar__name">
              <img src="\assets\images\logos\cfs-logo.png" alt="CFS logo" />
            </div>
            <ul>
              <li className="mobile-links">
                <a href="#">Home</a>
              </li>
              <li className="mobile-links">
                <a href="#">About Us</a>
              </li>
              <li className="mobile-links">
                <a href="#">Solutions</a>
              </li>
              <li className="mobile-links">
                <a href="#">Events</a>
              </li>
              <li className="mobile-links">
                <a href="#">Resources</a>
              </li>
              <li className="mobile-links">
                <a href="#">Contact Us</a>
              </li>
              <li>
                <button>Agent Portal</button>
              </li>
            </ul>
            <div className="navbar__mobile-socials">
              <Typography variant="h6">Follow Our Socials</Typography>
              <ul>
                <li>
                  <a href="#">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
