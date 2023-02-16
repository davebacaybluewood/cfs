import { Grid } from "@mui/material";
import React from "react";
import "./Blogs.scss";
import { blogs } from "data/blogs";
import Container from "@mui/system/Container";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import Chip from "library/Chip/Chip";

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const blogHandler = (id: string) => {
    console.log(id);
    navigate(paths.blogsSingle.replace(":id", id));
  };
  return (
    <div className="blogs">
      <PageTitle title="Blogs"></PageTitle>
      <Banner
        bigTitle="COMFORT BLOGS"
        title=""
        backgroundImage="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Container>
        <Grid container spacing={2}>
          {blogs.map((blog) => {
            console.log(blog.content.length);
            return (
              <Grid item xs={6} sm={6} md={4} lg={4} margin={0} padding={3}>
                <div className="blogs-container">
                  <div className="centered-content">
                    <img src={blog.thumbnail} alt={blog.thumbnail} />
                    <h2>{blog.title}</h2>
                    <div className="tags-container">
                      {blog.tags.map((tags) => {
                        return (
                          <Chip description={tags.description}></Chip>
                          // <Chip
                          //   label={tags.description}
                          //   variant="outlined"
                          //   size="small"
                          // ></Chip>
                        );
                      })}
                    </div>
                    <div className="contents">
                      {blog.content.length > 255 ? (
                        <p className="description">
                          {blog.content.substring(0, 255)}...{" "}
                          <span onClick={() => blogHandler(blog.id)}>
                            Read More
                          </span>
                        </p>
                      ) : (
                        <p className="description">{blog.content}</p>
                      )}
                      <img src="" alt="" />
                      <p className="author">{blog.author}</p>
                      <p className="date">{blog.dateCreated}</p>
                    </div>
                  </div>
                  <div className="author-date-views-content">
                    <p className="views">
                      <span>
                        <VisibilityIcon />
                      </span>
                      2
                    </p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Blogs;
