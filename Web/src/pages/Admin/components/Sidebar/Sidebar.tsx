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
} from "react-icons/fa";
import React from "react";
import "./Sidebar.scss";
import { Button } from "@mui/material";
import { IMAGES } from "constants/constants";
import paths from "constants/routes";

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
  const url = window.location.href;
  const currentPage = url.split(window.location.host)[1];

  console.log(currentPage);
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
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            active={currentPage === `/${paths.adminDashboard.substring(1)}`}
          >
            Dashboard
            <NavLink to={paths.adminDashboard} />
          </MenuItem>
          <MenuItem
            icon={<FaSkyatlas />}
            active={currentPage === `/${paths.adminServices.substring(1)}`}
          >
            Solutions <Link to={paths.adminServices} />
          </MenuItem>
          <MenuItem
            icon={<FaPeopleCarry />}
            active={currentPage === `/${paths.adminInquiries.substring(1)}`}
          >
            Inquiries <Link to={paths.adminInquiries} />
          </MenuItem>
          <MenuItem
            icon={<FaUserLock />}
            active={currentPage === `/${paths.adminAccounts.substring(1)}`}
          >
            Admin Accounts <Link to={paths.adminAccounts} />
          </MenuItem>
          <MenuItem
            icon={<FaBookReader />}
            active={currentPage === `/${paths.adminContacts.substring(1)}`}
          >
            Contacts <Link to={paths.adminContacts} />
          </MenuItem>
          <MenuItem
            icon={<FaChartArea />}
            active={currentPage === `/${paths.adminGraphs.substring(1)}`}
          >
            Graphs <Link to={paths.adminGraphs} />
          </MenuItem>
          <MenuItem
            icon={<FaRegCalendarAlt />}
            active={currentPage === `/${paths.adminCalendar.substring(1)}`}
          >
            Calendar <Link to={paths.adminCalendar} />
          </MenuItem>
          <MenuItem
            icon={<FaFly />}
            active={currentPage === `/${paths.adminEvents.substring(1)}`}
          >
            Events <Link to={paths.adminEvents} />
          </MenuItem>

          <MenuItem
            icon={<FaEnvelopeOpenText />}
            active={currentPage === `/${paths.adminEventInvites.substring(1)}`}
          >
            Event Invites <Link to={paths.adminEventInvites} />
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "16px" }}>
          <a
            className="sidebar-btn"
            href="http://localhost:3000/home"
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
