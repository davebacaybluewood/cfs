import React from "react";
import { BlogType } from "../BlogModels";
import "./BlogCard.scss";
import { getDateDays, getDateMonthShort } from "helpers/date";
import UserDetails from "library/UserDetail/UserDetails";

const BlogCard: React.FC<BlogType> = (props) => {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img src={props.image} alt="Author image" />
        <div className="blog-date">
          <div className="days">{getDateDays(new Date(props.date))}</div>
          <div className="month">{getDateMonthShort(new Date(props.date))}</div>
        </div>
      </div>
      <div className="blog-captions">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <UserDetails
        authorName={props.author.authorName}
        image={props.author.image}
      />
    </div>
  );
};

export default BlogCard;
