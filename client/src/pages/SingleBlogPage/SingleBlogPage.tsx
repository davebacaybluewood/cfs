import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogsDummy } from "constants/dummyDatas";
import BlogCard from "library/Blogs/BlogCard/BlogCard";
import { paths } from "constants/routes";
import UserDetails from "library/UserDetail/UserDetails";
import ReactHtmlParser from "html-react-parser";
import "./SingleBlogPage.scss";
import { formatISODateToDate } from "helpers/date";
import useScroll from "hooks/useScroll";
import { BlogData } from "pages/BlogPage/models";
import agent from "api/agent";
import Spinner from "library/Spinner/Spinner";

const SingleBlogPage: React.FC = () => {
  useScroll();
  const { blogTitle } = useParams();
  const navigate = useNavigate();
  const originalTitle = blogTitle?.split("-").join(" ").toLowerCase();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogData | undefined>();

  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      const data = await agent.BlogAndResource.listSingle(originalTitle ?? "");
      setBlog(data);
      setLoading(false);
    };
    fetchSingleData();
  }, []);

  // if (!blog) {
  //   navigate(paths.invalid);
  // }

  return (
    <div className="single-blog-page">
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            {loading ? (
              <Spinner variant="relative" />
            ) : (
              <React.Fragment>
                <div className="current-blog-image">
                  <img src={blog?.thumbnail} alt="" />
                </div>
                <div className="single-blog-content">
                  <h1>{blog?.title}</h1>
                  <UserDetails
                    authorName={`${blog?.authorName}, ${formatISODateToDate(
                      blog?.createdAt ?? ""
                    )}`}
                    image={blog?.authorThumbnail ?? " "}
                  />
                  <div className="blog-description">
                    {ReactHtmlParser(blog?.content ?? "")}
                  </div>
                </div>
              </React.Fragment>
            )}
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
