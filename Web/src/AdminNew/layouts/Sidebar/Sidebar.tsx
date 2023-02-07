import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import { FaGlobe, FaAngleDoubleRight } from "react-icons/fa";
import React, { useContext } from "react";
import "./Sidebar.scss";
import { IMAGES } from "constants/constants";
import getSidebarLinks, { ISidebarLinks } from "./helpers/getSidebarLinks";
import { MAIN_WEBSITE_LINK, ROLES } from "AdminNew/constants/constants";
import { UserContext } from "AdminNew/context/UserProvider";
import classNames from "classnames";

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
  const userCtx = useContext(UserContext) as any;
  const LOGGED_IN_ROLE = userCtx.user.role;

  const sidebarLinks = getSidebarLinks(LOGGED_IN_ROLE).sidebarMainLinks;
  const sidebarOtherLinks = getSidebarLinks(LOGGED_IN_ROLE).sidebarOtherLinks;

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
            const submenuClassnames = classNames({
              "active-submenu": link.isActive,
              "submenu-default": true,
            });
            if (link.isSubMenu) {
              return (
                <SubMenu
                  title={link.linkText}
                  icon={link.icon}
                  className={submenuClassnames}
                >
                  {link.subLinks?.map((sm) => (
                    <MenuItem icon={sm.icon}>
                      <NavLink to={sm.link ?? ""}>{sm.linkText}</NavLink>
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            }
            return (
              <MenuItem icon={link.icon} active={link.isActive} key={index}>
                {link.linkText}
                <NavLink to={link.link ?? ""} />
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
                <NavLink to={link.link ?? ""} />
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
