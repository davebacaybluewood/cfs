import { Box, Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import { blogs } from "data/blogs";
import { formatISODateOnly } from "helpers/dateFormatter";
import React from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import "./ViewBlog.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "View Blog",
    url: paths.adminViewBlogs,
    isActive: true,
  },
];

const ViewBlogs: React.FC = () => {
  const params = useParams();
  const blogId = params.id;
  const blogItem: any = blogs.find((b) => b.id === blogId);

  let dateAsSubtitle =
    blogItem.author + "," + " " + formatISODateOnly(blogItem.dateCreated);
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Title subtitle={dateAsSubtitle} title={blogItem.title}></Title>
      <Grid container className="view-blog-container">
        <Box className="view-blog-thumbnail">
          <img src={blogItem.thumbnail} alt={blogItem.thumbnail} />
        </Box>
        <Box className="view-blog-content">
          <p>{ReactHtmlParser(blogItem?.content ?? "")}</p>
        </Box>
      </Grid>
    </Wrapper>
  );
};

export default ViewBlogs;
