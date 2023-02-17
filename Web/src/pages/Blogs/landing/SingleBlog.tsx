import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.scss";
import { blogs } from "data/blogs";
import { formatISODateToDate } from "helpers/dateFormatter";
import Chip from "../components/Chip/Chip";

const SingleBlog: React.FC = () => {
  const params = useParams();
  const blogId = params.id;
  console.log(blogId);
  const [blogItem, setBlogItem] = useState<any>({});

  useEffect(() => {
    const currentBlog = blogs.find((b) => b.id === blogId);

    setBlogItem(currentBlog);
  }, [blogItem, blogId]);
  return (
    <Container className="single-blog-container">
      <Box className="blog-thumbnail">
        <img src={blogItem.thumbnail} alt={blogItem.thumbnail} />
      </Box>
      <Box className="blog-tags-container">
        <p>Tags:</p> <Chip tags={blogItem.tags}></Chip>
      </Box>
      <Box className="blog-author-date-container">
        <p>{formatISODateToDate(blogItem.dateCreated)}</p>
        <p>{blogItem.author}</p>
      </Box>
      <Box className="blog-content-container">
        <p>{blogItem.content}</p>
      </Box>
    </Container>
  );
};

export default SingleBlog;
