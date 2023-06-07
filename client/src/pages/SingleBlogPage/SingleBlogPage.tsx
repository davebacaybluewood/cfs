import { Container, Grid } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogsDummy } from "constants/dummyDatas";
import BlogCard from "library/Blogs/BlogCard/BlogCard";
import { paths } from "constants/routes";
import UserDetails from "library/UserDetail/UserDetails";
import ReactHtmlParser from "html-react-parser";
import "./SingleBlogPage.scss";
import { formatISODateToDate } from "helpers/date";
import useScroll from "hooks/useScroll";

const SingleBlogPage: React.FC = () => {
  useScroll();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const blog = blogsDummy.find((data) => data.blogId === blogId);

  return (
    <div className="single-blog-page">
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            <div className="current-blog-image">
              <img src={blog?.image} alt="" />
            </div>
            <div className="blog-content">
              <h1>{blog?.title}</h1>
              <UserDetails
                authorName={`${blog?.author.authorName}, ${formatISODateToDate(
                  blog?.date ?? ""
                )}`}
                image={blog?.author.image ?? " "}
              />
              <div className="blog-description">
                {ReactHtmlParser(blog?.description ?? "")}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <div className="suggested-blog">
              {blogsDummy.map((data) => {
                return (
                  <BlogCard
                    author={data.author}
                    blogId={data.blogId ?? ""}
                    date={data?.date ?? ""}
                    description={data?.description ?? ""}
                    image={data?.image ?? ""}
                    title={data?.title ?? ""}
                    onClick={() =>
                      navigate(
                        paths.single_blog.replace(":blogId", data.blogId)
                      )
                    }
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
