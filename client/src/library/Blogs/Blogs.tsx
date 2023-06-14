import React from "react";
import { BlogType } from "./BlogModels";
import BlogCard from "./BlogCard/BlogCard";
import { Container, Grid } from "@mui/material";
import { paths } from "constants/routes";
import { useNavigate } from "react-router-dom";
import "./Blogs.scss";
import { BlogData } from "pages/BlogPage/models";
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";
import Spinner from "library/Spinner/Spinner";

interface BlogsProps {
  title: string;
  isShowAll?: boolean;
}
const Blogs: React.FC<BlogsProps> = (props) => {
  const navigate = useNavigate();

  const { blogs, loading } = useFetchBlogResource(
    !props.isShowAll ? 3 : undefined
  );

  return (
    <div className="blog-section">
      <h2 className="blog-header">{props.title}</h2>
      <Container>
        <Grid container spacing={2}>
          {blogs?.map((blog, index) => {
            return (
              <Grid item sm={6} md={6} lg={3} key={blog._id} marginBottom={5}>
                <BlogCard
                  author={{
                    authorName: blog.authorName ?? "",
                    image: blog.authorThumbnail ?? "",
                  }}
                  blogId={blog._id ?? ""}
                  date={blog.createdAt ?? ""}
                  description={blog.content
                    .replace(/<[^>]*>/g, " ")
                    .replace("&quot;", " ")}
                  image={blog.thumbnail}
                  title={blog.title}
                  key={blog.authorID}
                  onClick={() => {
                    const filteredTitle = blog.title
                      .split(" ")
                      .join("-")
                      .toLowerCase();
                    navigate(
                      paths.single_blog.replace(":blogTitle", filteredTitle)
                    );
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

Blogs.defaultProps = {
  isShowAll: true,
};

export default Blogs;
