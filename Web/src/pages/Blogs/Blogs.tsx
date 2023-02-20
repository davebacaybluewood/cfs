import React from "react";
import "./Blogs.scss";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import BlogCard from "library/BlogCard/BlogCard";
import { Container, Grid } from "@mui/material";
import { blogs } from "data/blogs";

const Blogs: React.FC = () => {
  return (
    <div className="blogs">
      <PageTitle title="Blogs" />
      <Banner
        bigTitle="Comfort Blogs"
        title="Share your Stories"
        hasBorder={true}
        backgroundImage="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Container>
        <Grid
          container
          spacing={6}
          paddingLeft={12}
          paddingRight={12}
          marginBottom={3}
        >
          {blogs.map((blog) => {
            return (
              <Grid item xs={6} sm={6} md={4} lg={4} className="blog-grid">
                <BlogCard {...blog} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Blogs;
