import { MAX_CARD_TEXT } from "constants/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import Chip, { ChipTypes } from "pages/Blogs/components/Chip/Chip";
import { formatISODateToDate } from "helpers/dateFormatter";
import "./BlogCard.scss";

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
          {props.content.length > MAX_CARD_TEXT ? (
            <p className="description">
              {props.content.substring(0, MAX_CARD_TEXT)}...
              <p className="read-more" onClick={() => blogHandler(props.id)}>
                Read More
              </p>
            </p>
          ) : (
            <p className="description">{props.content}</p>
          )}
          <p className="author">{props.author}</p>
          <p className="date">
            {formatISODateToDate(props.dateCreated.toString())}
          </p>
          <div className="author-date-views-content">
            <p className="views">
              <span>
                <VisibilityIcon />
              </span>
              {props.numberOfVisits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
