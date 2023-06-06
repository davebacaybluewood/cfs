import React from "react";
import { BlogType } from "./BlogModels";
import BlogCard from "./BlogCard/BlogCard";
import { Container, Grid } from "@mui/material";
import "./Blogs.scss";

interface BlogsProps {
  title: string;
  blogs: BlogType[];
}
const Blogs: React.FC<BlogsProps> = (props) => {
  return (
    <div className="blog-section">
      <h2 className="blog-header">{props.title}</h2>
      <Container>
        <Grid container spacing={2}>
          {props.blogs?.map((blog, index) => {
            return (
              <Grid item sm={6} md={6} lg={4} key={blog.blogId}>
                <BlogCard
                  author={blog.author}
                  blogId={blog.blogId}
                  date={blog.date}
                  description={blog.description
                    .replace(/<[^>]*>/g, "")
                    .replace("&quot;", " ")}
                  image={blog.image}
                  title={blog.title}
                  key={blog.blogId}
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
