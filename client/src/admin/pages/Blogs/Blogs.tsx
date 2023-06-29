import { Button as MuiButton, Grid } from "@mui/material";
import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrumbTypes } from "../Dashboard/types";
import adminPaths from "admin/constants/routes";
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";
import { BlogData } from "pages/BlogPage/models";
import BlogCard from "library/Blogs/BlogCard/BlogCard";
import { paths } from "constants/routes";
import Button from "library/Button/Button";
import Spinner from "library/Spinner/Spinner";
import "./Blogs.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: adminPaths.dashboard,
    isActive: false,
  },
  {
    title: "Blogs",
    url: adminPaths.adminBlogs,
    isActive: true,
  },
];

const ADDITIONAL_BLOGS = 6;
const Blogs: React.FC = () => {
  const [limit, setLimit] = useState(12);
  const { blogs, loading, blogTotalLength } = useFetchBlogResource(0, limit);
  const navigate = useNavigate();

  const addBlogHandler = () => {
    navigate(adminPaths.adminBlogForm.replace(":id", "add"));
  };

  const [displayedBlogs, setDisplayedBlogs] = useState<
    BlogData[] | undefined
  >();

  const loadMoreHandler = () => {
    setLimit((currState) => currState + ADDITIONAL_BLOGS);
  };

  const displayedBlogsLength = (displayedBlogs?.length || 0) + 3;

  useEffect(() => {
    setDisplayedBlogs(blogs);
  }, [blogs]);

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Title subtitle="Manage all available blogs." title="Blogs">
        <div className="add-blogs">
          <MuiButton variant="contained" onClick={addBlogHandler}>
            Add Blog
          </MuiButton>
        </div>
      </Title>

      <div className="blog-admin-wrapper">
        <NoInformationToDisplay
          showNoInfo={blogs?.length === 0}
          message="No Blogs Available"
          title="No Information to Display"
        >
          <Grid container marginBottom={3} spacing={1}>
            {displayedBlogs?.map((blog) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={2}
                  lg={2}
                  margin={0}
                  className="admin-blog-grid"
                >
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
                    image={blog.thumbnail ?? ""}
                    title={blog.title}
                    key={blog._id}
                    onClick={() => {
                      navigate(
                        paths.adminViewBlogs.replace(":blogTitle", blog?._id)
                      );
                    }}
                  />
                </Grid>
              );
            })}
            <div className="loadMore-btn">
              {blogTotalLength > displayedBlogsLength ? (
                loading ? (
                  <Spinner variant="relative" />
                ) : (
                  <Button variant="default" onClick={loadMoreHandler}>
                    Load More
                  </Button>
                )
              ) : null}
            </div>
          </Grid>
        </NoInformationToDisplay>
      </div>
    </Wrapper>
  );
};

export default Blogs;
