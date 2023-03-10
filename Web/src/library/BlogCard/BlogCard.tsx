import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import Chip, { ChipTypes } from "pages/Blogs/components/Chip/Chip";
import { formatISODateOnly } from "helpers/dateFormatter";
import "./BlogCard.scss";
import {
  FaEye,
  FaHandPointer,
  FaRegCalendarAlt,
  FaUserEdit,
} from "react-icons/fa";
import { Box } from "@mui/material";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";

interface IBlogCard {
  id: string;
  thumbnail: string;
  title: string;
  tags: ChipTypes[];
  content?: string;
  author: string;
  dateCreated: Date;
  numberOfVisits?: number;
  showStatistics?: boolean;
  isAdmin?: boolean;
}

const BlogCard: React.FC<IBlogCard> = (props) => {
  const navigate = useNavigate();

  const blogHandler = (id: string) => {
    navigate(paths.blogsSingle.replace(":id", id));
  };
  const adminViewBlogHandler = (id: string) => {
    navigate(paths.adminViewBlogs.replace(":id", id));
  };
  const adminEditBlogHandler = (id: string) => {
    navigate(paths.adminBlogForm.replace(":id", id));
  };
  return (
    <div className="blogs-container">
      <div className="centered-content">
        <div className="thumbnail-container">
          <img src={props.thumbnail} alt={props.thumbnail} />
        </div>

        <h2>{props.title}</h2>
        <Chip tags={props.tags}></Chip>
        <div className="contents">
          <ComponentValidator showNull={!props.showStatistics}>
            <Box className="blog-card-statistics-container">
              <FaHandPointer />
              <span>{props.numberOfVisits}</span>
              <FaEye />
              <span>{props.numberOfVisits}</span>
            </Box>
          </ComponentValidator>

          <p className="description">
            {props.content?.replace(/<[^>]*>/g, "")}
          </p>
          <p className="author">
            <span>
              <FaUserEdit />
            </span>
            {props.author}
          </p>
          <p className="date">
            <span>
              <FaRegCalendarAlt />
            </span>
            {formatISODateOnly(props.dateCreated.toString())}
          </p>
        </div>
        {props.isAdmin ? (
          <React.Fragment>
            <button
              type="button"
              className="read-more"
              onClick={() => adminEditBlogHandler(props.id)}
            >
              Edit Blog
            </button>
            <button type="button" className="statistics-blog">
              Statistics
            </button>
            <button
              type="button"
              className="view-blog"
              onClick={() => adminViewBlogHandler(props.id)}
            >
              View Blog
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button
              type="button"
              className="read-more"
              onClick={() => blogHandler(props.id)}
            >
              Read More
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
