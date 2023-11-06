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
import { MAIN_IMAGES } from "constants/constants";
import useSidebarLinks, { ISidebarLinks } from "./hooks/useSidebarLinks";
import {
  AGENT_ROLES,
  CONTENT_CREATOR_ROLES,
  MAIN_WEBSITE_LINK,
} from "admin/constants/constants";
import { UserContext } from "admin/context/UserProvider";
import classNames from "classnames";
import {
  EDITOR_ROLES,
  POSITIONS,
  PROFILE_ROLES,
} from "pages/PortalRegistration/constants";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";
import Badge from "library/Badge/Badge";
import { Skeleton } from "@mui/material";

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
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );

  const USER_POSITION = profile?.position;
  const USER_ROLES = profile?.roles;

  const { sidebarOtherLinks, sidebarMainLinks: sidebarLinks } = useSidebarLinks(
    USER_POSITION,
    USER_ROLES
  );

  const isAdmin = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });

  const isSubscriber = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.SUBSCRIBER.ROLE_SUBSRIBER.value;
  });

  const profileName = profile?.name
    ? profile?.name
    : `${profile?.firstName} ${profile?.lastName}`;

  const { linksLength: linksLengthSub } = useSidebarLinks(undefined, [
    {
      label: PROFILE_ROLES.SUBSCRIBER.ROLE_SUBSRIBER.label,
      value: PROFILE_ROLES.SUBSCRIBER.ROLE_SUBSRIBER.value,
    },
  ]);

  const { linksLength: linksLengthAgent } = useSidebarLinks(undefined, [
    {
      label: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.label,
      value: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
    },
  ]);

  const { linksLength: linksLengthAdmin } = useSidebarLinks(undefined, [
    {
      label: PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.label,
      value: PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value,
    },
  ]);

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {loading ? <Spinner variant="fixed" /> : null}
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
                src={MAIN_IMAGES.MAIN_LOGO}
                alt={MAIN_IMAGES.MAIN_LOGO}
                className="admin-logo"
              />
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        {!loading ? (
          <div>
            <div className="user-sidebar">
              <h2>{profileName}</h2>
              <div>
                {profile?.position?.map((data) => {
                  const isAgent = POSITIONS[0].value === data.value;
                  const isEditor = POSITIONS[1].value === data.value;
                  const isContentCreator = POSITIONS[2].value === data.value;

                  const badgeVariant = isAgent
                    ? "secondary"
                    : isEditor || isContentCreator
                    ? "danger"
                    : "primary";
                  return <Badge variant={badgeVariant}>{data.label}</Badge>;
                })}
              </div>
              {isAdmin || isSubscriber ? null : (
                <div>
                  {profile?.roles?.map((data) => {
                    const isAgent = AGENT_ROLES?.some(
                      (e) => e.value === data.value
                    );
                    const isEditor = EDITOR_ROLES?.some(
                      (e) => e.value === data.value
                    );
                    const isContentCreator = CONTENT_CREATOR_ROLES?.some(
                      (e) => e.value === data.value
                    );

                    const badgeVariant = isAgent
                      ? "secondary"
                      : isEditor || isContentCreator
                      ? "danger"
                      : "primary";
                    return (
                      <React.Fragment>
                        <Badge variant={badgeVariant} isBordered>
                          {data.label}
                        </Badge>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="profile-parent-skeleton">
            <Skeleton
              className="profile-name-skeleton"
              variant="rounded"
              width={180}
              height={20}
            />
            <Skeleton
              className="badge-skeleton"
              variant="rounded"
              width={110}
              height={15}
            />
          </div>
        )}

        <h2 className="sidebar-label">Main Links</h2>
        {!loading ? (
          <>
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
                      // open={link.open}
                      key={index}
                    >
                      {link.subLinks?.map((sm, sLIndex) => (
                        <MenuItem
                          icon={sm.icon}
                          suffix={
                            sm.badge ? (
                              <span className="badge">{sm.badge}</span>
                            ) : null
                          }
                          active={sm.isActive}
                          key={sLIndex}
                        >
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
          </>
        ) : (
          <div>
            {/* If current role is master admin */}
            {localStorage.userRole ===
              PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value &&
              Array.from({ length: linksLengthAdmin }).map(
                (item, index: number) => (
                  <div className="links-parent-skeleton" key={index}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="rounded" width={180} height={20} />
                  </div>
                )
              )}

            {/* If current role is subscriber */}
            {localStorage.userRole ===
              PROFILE_ROLES.SUBSCRIBER.ROLE_SUBSRIBER.value &&
              Array.from({ length: linksLengthSub }).map(
                (item, index: number) => (
                  <div className="links-parent-skeleton" key={index}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="rounded" width={180} height={20} />
                  </div>
                )
              )}

            {/* If current role is agent */}
            {localStorage.userRole ===
              PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value &&
              Array.from({ length: linksLengthAgent }).map(
                (item, index: number) => (
                  <div className="links-parent-skeleton" key={index}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="rounded" width={180} height={20} />
                  </div>
                )
              )}
          </div>
        )}

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
        {isSubscriber ? (
          <div className="sidebar-btn-wrapper">
            <a
              className="sidebar-btn"
              href="https://agent.comfortfinancialsolutions.com/signup"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 16 }}
            >
              <FaGlobe />
              <span style={{ fontSize: 14 }}>Upgrade to Agent</span>
            </a>
          </div>
        ) : (
          <div className="sidebar-btn-wrapper">
            <a
              className="sidebar-btn"
              href={MAIN_WEBSITE_LINK[0]}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe />
              <span>Comfort Financial Solutions Web</span>
            </a>
          </div>
        )}
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
