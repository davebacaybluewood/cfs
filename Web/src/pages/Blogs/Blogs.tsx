import React from "react";
import "./Blogs.scss";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import BlogCard from "./components/BlogCard";
import { Container, Grid } from "@mui/material";
import { blogs } from "data/blogs";

const Blogs: React.FC = () => {
  return (
    <div className="blogs">
      <PageTitle title="Blogs" />
      <Banner
        bigTitle="COMFORT BLOGS"
        title=""
        backgroundImage="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Container>
        <Grid container spacing={2} marginBottom={3}>
          {blogs.map((blog) => {
            return (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={4}
                margin={0}
                padding={0}
                width={2}
                className="blog-grid"
              >
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
