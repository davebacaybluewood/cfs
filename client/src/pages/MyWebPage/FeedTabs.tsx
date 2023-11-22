import React from "react";
import { FaHome, FaCalendar } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { MdOutlineLibraryBooks } from "react-icons/md";

export type ContentTypes = "home" | "events" | "testimonial" | "articles";

export interface FeedTabsProps {
  setContent: React.Dispatch<React.SetStateAction<ContentTypes>>;
  content: ContentTypes;
}
const FeedTabs: React.FC<FeedTabsProps> = (props) => {
  const { setContent, content } = props;

  const navLinks = [
    {
      icon: <FaHome />,
      onClick: () => {
        setContent("home");
      },
      className: content === "home" ? "active-nav" : "",
      link: "Home",
    },
    {
      icon: <FaCalendar />,
      onClick: () => {
        setContent("events");
      },
      className: content === "events" ? "active-nav" : "",
      link: "Events",
    },
    {
      icon: <GrSend />,
      onClick: () => {
        setContent("testimonial");
      },
      className:
        content === "testimonial" ? "active-nav" : "",
      link: "Recommendation",
    },
    {
      icon: <MdOutlineLibraryBooks />,
      onClick: () => {
        setContent("articles");
      },
      className: content === "articles" ? "active-nav" : "",
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
