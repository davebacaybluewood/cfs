import React from "react";
import { BlogType } from "../BlogModels";
import "./BlogCard.scss";
import { getDateDays, getDateMonthShort } from "helpers/date";
import UserDetails from "library/UserDetail/UserDetails";

const BlogCard: React.FC<BlogType> = (props) => {
  return (
    <div className="blog-card" onClick={props.onClick}>
      <div className="blog-image">
        <img src={props.image} alt="Author image" />
        <div className="blog-date">
          <div className="days">{getDateDays(new Date(props.date))}</div>
          <div className="month">{getDateMonthShort(new Date(props.date))}</div>
          <div className="year"></div>
        </div>
      </div>
      <div className="blog-captions">
        <h2>{props.title}</h2>
        <div className="blog-content">
          {props.description.replace(/<[^>]*>/g, "").replace("&quot;", " ")}
        </div>
      </div>
      <UserDetails
        authorName={props.author.authorName}
        image={props.author.image}
      />
    </div>
  );
};

export default BlogCard;
