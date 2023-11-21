import React from "react";
import { FaHome, FaCalendar } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { MdOutlineLibraryBooks } from "react-icons/md";

export type ContentTypes = "home" | "events" | "reccomendation" | "articles";

export interface FeedTabsProps {
  setContent: React.Dispatch<React.SetStateAction<ContentTypes>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  content: ContentTypes;
}
const FeedTabs: React.FC<FeedTabsProps> = (props) => {
  const { setActive, setContent, active, content } = props;

  const navLinks = [
    {
      icon: <FaHome />,
      onClick: () => {
        setContent("home");
        setActive(true);
      },
      className: active === true && content === "home" ? "active-nav" : "",
      link: "Home",
    },
    {
      icon: <FaCalendar />,
      onClick: () => {
        setContent("events");
        setActive(true);
      },
      className: active === true && content === "events" ? "active-nav" : "",
      link: "Events",
    },
    {
      icon: <GrSend />,
      onClick: () => {
        setContent("reccomendation");
        setActive(true);
      },
      className:
        active === true && content === "reccomendation" ? "active-nav" : "",
      link: "Recommendation",
    },
    {
      icon: <MdOutlineLibraryBooks />,
      onClick: () => {
        setContent("articles");
        setActive(true);
      },
      className: active === true && content === "articles" ? "active-nav" : "",
      link: "Articles",
    },
  ];

  return (
    <React.Fragment>
      {navLinks.map((nav) => (
        <div className={`nav-tab ${nav.className}`} onClick={nav.onClick}>
          <h2 className="navlink-title">{nav.link}</h2>
        </div>
      ))}
    </React.Fragment>
  );
};

export default FeedTabs;
