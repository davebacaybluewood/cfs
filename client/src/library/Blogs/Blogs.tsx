import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard/BlogCard";
import { Container, Grid } from "@mui/material";
import { paths } from "constants/routes";
import { useNavigate } from "react-router-dom";
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";
import Spinner from "library/Spinner/Spinner";
import { BlogData } from "pages/BlogPage/models";
import Button from "library/Button/Button";
import "./Blogs.scss";

interface BlogsProps {
  title: string;
  isShowAll?: boolean;
  hasLoadMoreBtn?: boolean;

  blogsConfig: {
    limit: number;
    skip: number;
  };
}
const ADDITIONAL_BLOGS = 6;

const Blogs: React.FC<BlogsProps> = (props) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(props.blogsConfig.limit);
  const { blogs, loading, blogTotalLength } = useFetchBlogResource(
    !props.isShowAll ? props.blogsConfig.skip : 0,
    limit
  );

  const [displayedBlogs, setDisplayedBlogs] = useState<
    BlogData[] | undefined
  >();

  useEffect(() => {
    setDisplayedBlogs(blogs);
  }, [blogs]);

  const loadMoreHandler = () => {
    setLimit((currState) => currState + ADDITIONAL_BLOGS);
  };
  const displayedBlogsLength = (displayedBlogs?.length || 0) + 3;

  return (
    <div className="blog-section">
      <h2 className="blog-header">{props.title}</h2>
      <Container>
        <Grid container spacing={2}>
          {displayedBlogs?.map((blog, index) => {
            return (
              <Grid item sm={6} md={6} lg={4} key={blog._id} marginBottom={5}>
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
        {props.hasLoadMoreBtn && blogTotalLength > displayedBlogsLength ? (
          <Button variant="default" onClick={loadMoreHandler}>
            Load More
          </Button>
        ) : null}
      </Container>
      {loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

Blogs.defaultProps = {
  isShowAll: true,
  hasLoadMoreBtn: false,
};

export default Blogs;
