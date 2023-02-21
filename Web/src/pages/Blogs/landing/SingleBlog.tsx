import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.scss";
import { blogs } from "data/blogs";
import { formatISODateToDate } from "helpers/dateFormatter";
import Chip from "../components/Chip/Chip";
import * as FontAwesome from "react-icons/fa";

const SingleBlog: React.FC = () => {
  const params = useParams();
  const blogId = params.id;
  const blogItem: any = blogs.find((b) => b.id === blogId);
  const socialIcon = blogItem.socialLinks.map((social: any) => {
    console.log(social);
    return social;
  });
  //parse content
  return (
    <Container className="single-blog-container">
      <Box className="blog-thumbnail">
        <img src={blogItem.thumbnail} alt={blogItem.thumbnail} />
      </Box>
      <Box className="blog-title">
        <h1>{blogItem.title}</h1>
        <Box className="blog-tags-container">
          <p>Tags:</p> <Chip tags={blogItem?.tags}></Chip>
        </Box>
        <Box className="blog-author-date-container">
          <p>{formatISODateToDate(blogItem.dateCreated)}</p>
          <p>{blogItem.author}</p>
        </Box>
      </Box>
      <Box className="blog-content-container">
        <p>{blogItem.content.replace(/<[^>]*>/g, "")}</p>
        <Box className="blog-share-icons">
          <FontAwesome.FaShare className="share-icon" />
          {socialIcon.map((icon: any) => {
            const Icon = (FontAwesome as any)[icon.icon];
            return <Icon />;
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleBlog;
