import React from "react";
import { BlogType } from "./BlogModels";
import BlogCard from "./BlogCard/BlogCard";
import { Container, Grid } from "@mui/material";
import "./Blogs.scss";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";

interface BlogsProps {
  title: string;
  blogs: BlogType[];
}
const Blogs: React.FC<BlogsProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="blog-section">
      <h2 className="blog-header">{props.title}</h2>
      <Container>
        <Grid container spacing={2}>
          {props.blogs?.map((blog, index) => {
            return (
              <Grid item sm={6} md={6} lg={3} key={blog.blogId}>
                <BlogCard
                  author={blog.author}
                  blogId={blog.blogId}
                  date={blog.date}
                  description={blog.description
                    .replace(/<[^>]*>/g, " ")
                    .replace("&quot;", " ")}
                  image={blog.image}
                  title={blog.title}
                  key={blog.blogId}
                  onClick={() =>
                    navigate(paths.single_blog.replace(":blogId", blog.blogId))
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Blogs;
