import { Box, Container, Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import { blogs } from "data/blogs";
import BlogCard from "library/BlogCard/BlogCard";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./Blogs.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Blogs",
    url: paths.faqs,
    isActive: true,
  },
];

const Blogs: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Title subtitle="View All Blogs" title="Blogs"></Title>

      <Grid container marginBottom={3}>
        {blogs.map((blog) => {
          return (
            <Grid item xs={12} sm={6} md={2} lg={2} className="admin-blog-grid">
              <BlogCard
                author={blog.author}
                dateCreated={blog.dateCreated}
                id={blog.id}
                tags={blog.tags}
                thumbnail={blog.thumbnail}
                title={blog.title}
                numberOfVisits={blog.numberOfVisits}
                showStatistics={true}
              />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Blogs;
