import { Container, Grid } from "@mui/material";
import { MAX_CARD_TEXT } from "constants/constants";
import { blogs } from "data/blogs";
import Chip from "library/Chip/Chip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";

const BlogsCard: React.FC = () => {
  const navigate = useNavigate();
  const blogHandler = (id: string) => {
    navigate(paths.blogsSingle.replace(":id", id));
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {blogs.map((blog) => {
          let fullDate = blog.dateCreated;
          let year = fullDate.getFullYear();
          let month = fullDate.getMonth();
          let day = fullDate.getDate();
          return (
            <Grid item xs={6} sm={6} md={4} lg={4} margin={0} padding={3}>
              <div className="blogs-container">
                <div className="centered-content">
                  <img src={blog.thumbnail} alt={blog.thumbnail} />
                  <h2>{blog.title}</h2>
                  <div className="tags-container">
                    {blog.tags.map((tags) => {
                      return <Chip description={tags.description}></Chip>;
                    })}
                  </div>
                  <div className="contents">
                    {blog.content.length > MAX_CARD_TEXT ? (
                      <p className="description">
                        {blog.content.substring(0, MAX_CARD_TEXT)}...
                        <p
                          className="read-more"
                          onClick={() => blogHandler(blog.id)}
                        >
                          Read More
                        </p>
                      </p>
                    ) : (
                      <p className="description">{blog.content}</p>
                    )}
                    <p className="author">{blog.author}</p>
                    <p className="date">
                      {month}/{day}/{year}
                    </p>
                  </div>
                </div>
                <div className="author-date-views-content">
                  <p className="views">
                    <span>
                      <VisibilityIcon />
                    </span>
                    {blog.numberOfVisits}
                  </p>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default BlogsCard;
