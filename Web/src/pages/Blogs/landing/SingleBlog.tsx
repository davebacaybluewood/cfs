import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.scss";
import { blogs } from "data/blogs";
import { formatISODateOnly } from "helpers/dateFormatter";
import Chip from "../components/Chip/Chip";
import * as FontAwesome from "react-icons/fa";
import ReactHtmlParser from "html-react-parser";

const SingleBlog: React.FC = () => {
  const params = useParams();
  const blogId = params.id;
  const blogItem: any = blogs.find((b) => b.id === blogId);
  const socialIcon = blogItem.socialLinks.map((social: string) => {
    return social;
  });
  //copy link function
  const [linkCopied, setLinkCopied] = useState(false);
  const currentLink = window.location.href;
  const copyLinkHandler = () => {
    navigator.clipboard.writeText(currentLink);
    setLinkCopied(true);
  };
  //parse content
  return (
    <Container className="single-blog-container">
      <Box className="blog-thumbnail">
        <img src={blogItem.thumbnail} alt={blogItem.thumbnail} />
      </Box>
      <Box className="blog-title">
        <h1>{blogItem.title}</h1>
        <Box className="blog-tags-container">
          <Chip tags={blogItem?.tags}></Chip>
        </Box>
        <Box className="blog-author-date-container">
          <p>
            <span>
              <FontAwesome.FaCalendarAlt />
            </span>
            {formatISODateOnly(blogItem.dateCreated)}
          </p>
          <p>
            <span>
              <FontAwesome.FaUserEdit />
            </span>
            {blogItem.author}
          </p>
        </Box>
      </Box>
      <Box className="blog-content-container">
        <p>{ReactHtmlParser(blogItem?.content ?? "")}</p>
        <Box className="blog-share-icons">
          <h2>Share This Blog: </h2>
          <FontAwesome.FaLink
            className="share-icon"
            onClick={copyLinkHandler}
          />
          {socialIcon.map((icon: any) => {
            const Icon = (FontAwesome as any)[icon.icon];
            return <Icon />;
          })}

          <Box>{linkCopied && <span>Link Copied!</span>}</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SingleBlog;
