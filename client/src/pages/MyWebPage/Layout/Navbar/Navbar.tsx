import React from "react";
import { Container } from "@mui/material";
import { MAIN_IMAGES } from "constants/constants";
import Button from "library/Button/Button";
import "./Navbar.scss";
import { FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="my-webpage-navbar">
      <Container>
        <div className="navbar-content">
          <img src={MAIN_IMAGES.MAIN_LOGO} alt="cfs logo" />
          <div className="search-bar">
            <FaSearch />
            <span>
              <input type="search" placeholder="Search " />
            </span>
          </div>
          <Button variant="secondary">Sign Up</Button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
