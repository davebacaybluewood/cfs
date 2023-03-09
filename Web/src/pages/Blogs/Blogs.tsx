import React, { useEffect, useState } from "react";
import "./Blogs.scss";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import BlogCard from "library/BlogCard/BlogCard";
import { Container, Grid } from "@mui/material";
import { blogs } from "data/blogs";
import ENDPOINTS from "constants/endpoints";
import useFetchBlogs from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs";

export type ChipTypes = {
  _id: string;
  label: string;
};

export type BlogType = {
  _id: string;
  thumbnail: string;
  title: string;
  tags: ChipTypes[];
  content?: string;
  author: string;
  authorName: string;
  createdAt?: Date;
  dateCreated: Date;
};

const Blogs: React.FC = () => {
  const { blogs } = useFetchBlogs();

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
          spacing={{ xs: 2, sm: 2, md: 6, lg: 6 }}
          paddingLeft={{ xs: 0, sm: 0, md: 12, lg: 12 }}
          paddingRight={{ xs: 0, sm: 0, md: 12, lg: 12 }}
          marginBottom={3}
        >
          {blogs.map((blog: any) => {
            const tags = blog.tags.map((tag: any) => {
              return {
                description: tag.label,
                link: "/",
              };
            });
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} className="blog-grid">
                <BlogCard
                  author={blog.authorName}
                  dateCreated={new Date(blog.createdAt?.toString() ?? "")}
                  id={blog._id}
                  tags={tags}
                  content={blog.content}
                  thumbnail={blog.thumbnail}
                  title={blog.title}
                  numberOfVisits={0}
                  showStatistics={false}
                  isAdmin={false}
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
