import React, { useState } from "react";
import NavLinksDesktop from "./components/NavLinksDesktop";
import { Container, SwipeableDrawer, Typography } from "@mui/material";
import { FaBars, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import useResponsive from "hooks/userResponsive";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { paths } from "constants/routes";
import { MAIN_IMAGES } from "constants/constants";
import classNames from "classnames";

interface NavbarProps {
  theme?: "SKY" | "RED" | "NAVY";
}
const Navbar: React.FC<NavbarProps> = (props) => {
  const isMobileMode = useResponsive("mobile");
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const navbarClassnames = classNames("navbar", {
    "color-navy": props.theme === "NAVY",
    "color-red": props.theme === "RED",
    "color-sky": props.theme === "SKY",
  });

  const url = window.location.href;
  const currentPage = url.split("/")[3];

  const setActive = (path: string) => {
    if (currentPage === path.substring(1)) {
      return "nav-links nav-links-active";
    } else if (path === paths.home && currentPage === "") {
      return "nav-links nav-links-active";
    }

    return "nav-links";
  };

  return (
    <div className={navbarClassnames}>
      <Container>
        <div className="navbar__content">
          <div className="navbar__name">
            <img src={MAIN_IMAGES.WHITE_LOGO} alt="CFS logo" />
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
                    link: paths.home,
                    text: "Home",
                    className: setActive(paths.home),
                  },
                  {
                    link: paths.about_us,
                    text: "About Us",
                    className: setActive(paths.about_us),
                  },
                  {
                    link: paths.solutions,
                    text: "Solutions",
                    className: setActive(paths.solutions),
                  },
                  {
                    link: paths.events,
                    text: "Events",
                    className: setActive(paths.events),
                  },
                  {
                    link: paths.resources,
                    text: "Resources",
                    className: setActive(paths.resources),
                  },
                  {
                    link: paths.contact_us,
                    text: "Contact Us",
                    className: setActive(paths.contact_us),
                  },
                  {
                    link: paths.login,
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
              <Link to="/">Home</Link>
            </li>
            <li className="mobile-links">
              <Link to={paths.about_us}>About Us</Link>
            </li>
            <li className="mobile-links">
              <Link to={paths.solutions}>Solutions</Link>
            </li>
            <li className="mobile-links">
              <Link to={paths.events}>Events</Link>
            </li>
            <li className="mobile-links">
              <Link to={paths.resources}>Resources</Link>
            </li>
            <li className="mobile-links">
              <Link to={paths.contact_us}>Contact Us</Link>
            </li>
            <li>
              <button onClick={() => navigate(paths.login)}>
                Agent Portal
              </button>
            </li>
          </ul>
          <div className="navbar__mobile-socials">
            <Typography variant="h6">Follow Our Socials</Typography>
            <ul>
              <li>
                <a href="fb.com" target="_blank">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="fb.com" target="_blank">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="fb.com" target="_blank">
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default Navbar;
