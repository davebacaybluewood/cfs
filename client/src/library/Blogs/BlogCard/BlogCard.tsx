import React from "react";
import { BlogType } from "../BlogModels";
import { getDateDays, getDateMonthShort } from "helpers/date";
import UserDetails from "library/UserDetail/UserDetails";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import "./BlogCard.scss";

const BlogCard: React.FC<BlogType> = (props) => {
  return (
    <div className="blog-card" onClick={props.onClick}>
      <div className="blog-image">
        <img src={props.image} alt="Blog Photo" />
        <div className="blog-date">
          <div className="days">{getDateDays(new Date(props.date))}</div>
          <div className="month">{getDateMonthShort(new Date(props.date))}</div>
          <div className="year"></div>
        </div>
      </div>
      <div className="blog-captions">
        <HtmlTooltip
          title={
            <div
              style={{
                fontSize: "1.3rem",
              }}
            >
              {props.title}
            </div>
          }
        >
          <div className="blog-title">
            <h2>{props.title}</h2>
          </div>
        </HtmlTooltip>
        <div className="card-blog-content">
          {props.description.replace(/<[^>]*>/g, "").replace("&quot;", " ")}
        </div>
      </div>
      <UserDetails
        authorName="CFS Editor"
        image={props.author.image ? props.author.image : ""}
      />
    </div>
  );
};

export default BlogCard;
