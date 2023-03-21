import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.scss";
import { formatISODateOnly } from "helpers/dateFormatter";
import * as FontAwesome from "react-icons/fa";
import ReactHtmlParser from "html-react-parser";
import useFetchBlogs from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs";
import Chip from "../components/Chip/Chip";
import Spinner from "library/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { COMPANY_NAME } from "constants/constants";

export type ChipTypes = {
  _id: string;
  label: string;
};

const SingleBlog: React.FC = () => {
  const params = useParams();
  const blogId = params.id;
  const { blogs: blog, loading } = useFetchBlogs(blogId);

  // const socialIcon = blogItem.socialLinks.map((social: string) => {
  //   return social;
  // });
  console.log(blog);
  const [linkCopied, setLinkCopied] = useState(false);
  const currentLink = window.location.href;
  const copyLinkHandler = () => {
    navigator.clipboard.writeText(currentLink);
    setLinkCopied(true);
  };

  const tagLists = blog[0]?.tags?.map((tag: any) => {
    return {
      description: tag.label,
      link: "/",
    };
  });
  const metaTagKeywordLists = blog[0]?.metaTagKeywords.map((metaTag: any) => {
    return metaTag.keyword;
  });
  const metaTagTitleFormat = blog[0]?.metaTagTitle
    ? blog[0]?.metaTagTitle + " | " + COMPANY_NAME
    : COMPANY_NAME;

  return (
    <Container className="single-blog-container">
      <Helmet>
        <title>{metaTagTitleFormat}</title>
        <meta name="description" content={blog[0]?.metaTagDescription} />
        <meta name="keywords" content={metaTagKeywordLists?.join(", ")} />
        <link rel="canonical" href={currentLink} />
      </Helmet>
      <Spinner isVisible={loading} />
      <Box className="blog-thumbnail">
        <img src={blog[0]?.thumbnail} alt={blog[0]?.thumbnail} />
      </Box>
      <Box className="blog-title">
        <h1>{blog[0]?.title}</h1>
        <Box className="blog-tags-container">
          <Chip tags={tagLists ?? []}></Chip>
        </Box>
        <Box className="blog-author-date-container">
          <p>
            <span>
              <FontAwesome.FaCalendarAlt />
            </span>
            {formatISODateOnly(blog[0]?.createdAt?.toString() ?? "") ?? ""}
          </p>
          <p>
            <span>
              <FontAwesome.FaUserEdit />
            </span>
            {blog[0]?.singleAuthorName}
          </p>
        </Box>
      </Box>
      <Box className="blog-content-container">
        <p>{ReactHtmlParser(blog[0]?.content ?? "")}</p>
        <Box className="blog-share-icons">
          <h2>Share This Blog: </h2>
          <FontAwesome.FaLink
            className="share-icon"
            onClick={copyLinkHandler}
          />
          {/* {socialIcon?.map((icon: any) => {
            const Icon = (FontAwesome as any)[icon.icon];
            return <Icon />;
          })} */}

          <Box>{linkCopied && <span>Link Copied!</span>}</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SingleBlog;
