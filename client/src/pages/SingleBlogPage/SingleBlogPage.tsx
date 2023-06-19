import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";

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
  }, [blogTitle]);

  const { blogs: suggestedBlogs } = useFetchBlogResource(0, 4);

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
              <h2>Read More Blogs</h2>
              {suggestedBlogs?.map((data) => {
                return (
                  <BlogCard
                    blogId={data._id}
                    author={{
                      authorName: blog?.authorName ?? " ",
                      image: blog?.authorThumbnail ?? "",
                    }}
                    date={data?.createdAt ?? ""}
                    description={data?.content ?? ""}
                    image={data?.thumbnail ?? ""}
                    title={data?.title ?? ""}
                    onClick={() => {
                      const filteredTitle = data.title
                        .split(" ")
                        .join("-")
                        .toLowerCase();
                      navigate(
                        paths.single_blog.replace(":blogTitle", filteredTitle)
                      );
                    }}
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
