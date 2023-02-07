import { Link, NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaGlobe,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaSkyatlas,
  FaBookReader,
  FaPeopleCarry,
  FaUserLock,
  FaChartArea,
  FaGlassCheers,
  FaFly,
  FaEnvelopeOpenText,
  FaRegCalendarAlt,
  FaUserSecret,
  FaCogs,
  FaRegCalendarCheck,
} from "react-icons/fa";
import React from "react";
import "./Sidebar.scss";
import { Button } from "@mui/material";
import { IMAGES } from "constants/constants";
import paths from "constants/routes";
import getSidebarLinks, { ISidebarLinks } from "./helpers/getSidebarLinks";
import { MAIN_WEBSITE_LINK, ROLES } from "AdminNew/constants/constants";

type SidebarProps = {
  image?: string;
  collapsed?: boolean;
  toggled?: boolean;
  handleToggleSidebar?: (e: any) => void;
  handleCollapsedChange?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const sidebarLinks = getSidebarLinks(ROLES.ROLE_AGENT).sidebarMainLinks;
  const sidebarOtherLinks = getSidebarLinks(ROLES.ROLE_AGENT).otherLinks;

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem onClick={handleCollapsedChange}>
              <img
                src={IMAGES.COMPANY_LOGOS.NEW}
                alt={IMAGES.COMPANY_LOGOS.NEW}
                className="admin-logo"
              />
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <h2 className="sidebar-label">Main Links</h2>
        <Menu iconShape="circle">
          {sidebarLinks.map((link: ISidebarLinks, index: number) => {
            return (
              <MenuItem icon={link.icon} active={link.isActive} key={index}>
                {link.linkText}
                <NavLink to={link.link} />
              </MenuItem>
            );
          })}
        </Menu>

        <h2 className="sidebar-label">Other Links</h2>
        <Menu iconShape="circle">
          {sidebarOtherLinks.map((link: ISidebarLinks, index: number) => {
            return (
              <MenuItem icon={link.icon} active={link.isActive} key={index}>
                {link.linkText}
                <NavLink to={link.link} />
              </MenuItem>
            );
          })}
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "16px" }}>
          <a
            className="sidebar-btn"
            href={MAIN_WEBSITE_LINK[0]}
            target="_blank"
          >
            <FaGlobe />
            <span>Comfort Life Financial Web</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
