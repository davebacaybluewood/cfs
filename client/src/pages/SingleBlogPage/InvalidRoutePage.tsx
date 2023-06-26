import { Container, Grid } from "@mui/material";
import agent from "api/agent";
import { paths } from "constants/routes";
import useScroll from "hooks/useScroll";
import InvalidRoute from "layout/InvalidRoute/InvalidRoute";
import BlogCard from "library/Blogs/BlogCard/BlogCard";
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";
import { BlogData } from "pages/BlogPage/models";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const InvalidRoutePage = () => {
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
    <Container>
      <Grid container spacing={2}>
        <Grid sm={12} md={12} lg={9}>
          <div className="invalid-section">
            <InvalidRoute />
          </div>
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
  );
};

export default InvalidRoutePage;
