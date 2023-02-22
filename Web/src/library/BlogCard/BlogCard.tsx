import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import Chip, { ChipTypes } from "pages/Blogs/components/Chip/Chip";
import { formatISODateOnly } from "helpers/dateFormatter";
import "./BlogCard.scss";
import { FaRegCalendarAlt, FaUserEdit } from "react-icons/fa";

interface IBlogCard {
  id: string;
  thumbnail: string;
  title: string;
  tags: ChipTypes[];
  content: string;
  author: string;
  dateCreated: Date;
  numberOfVisits: number;
}

const BlogCard: React.FC<IBlogCard> = (props) => {
  const navigate = useNavigate();
  const blogHandler = (id: string) => {
    navigate(paths.blogsSingle.replace(":id", id));
  };
  return (
    <div className="blogs-container">
      <div className="centered-content">
        <img src={props.thumbnail} alt={props.thumbnail} />
        <h2>{props.title}</h2>
        <Chip tags={props.tags}></Chip>
        <div className="contents">
          <p className="description">{props.content.replace(/<[^>]*>/g, "")}</p>
          <p className="author">
            {props.author}
            <span>
              <FaUserEdit />
            </span>
          </p>
          <p className="date">
            {formatISODateOnly(props.dateCreated.toString())}
            <span>
              <FaRegCalendarAlt />
            </span>
          </p>
        </div>
        <button
          type="button"
          className="read-more"
          onClick={() => blogHandler(props.id)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
