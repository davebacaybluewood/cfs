import { Button, Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import BlogCard from "library/BlogCard/BlogCard";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CrumbTypes } from "../Dashboard/types";
import useFetchBlogs from "../FileMaintenance/pages/Webinars/hooks/useFetchBlogs";
import "./Blogs.scss";
import { ChipTypes } from "./types";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Blogs",
    url: paths.adminBlogs,
    isActive: true,
  },
];

const Blogs: React.FC = () => {
  const { blogs, loading } = useFetchBlogs();

  const navigate = useNavigate();

  const addBlogHandler = () => {
    navigate(paths.adminBlogForm.replace(":id", "add"));
  };
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <Title subtitle="Manage all available blogs." title="Blogs">
        <div className="add-blogs">
          <Button variant="contained" onClick={addBlogHandler}>
            Add Blog
          </Button>
        </div>
      </Title>

      <NoInformationToDisplay
        showNoInfo={blogs.length === 0}
        message="No Blogs Available"
        title="No Information to Display"
      >
        <Grid container marginBottom={3} spacing={1}>
          {blogs?.map((blog: any) => {
            const tags = blog.tags.map((tag: ChipTypes) => {
              return {
                description: tag.label,
                link: "/",
              };
            });
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
                  author={blog.authorName}
                  dateCreated={new Date(blog.createdAt?.toString() ?? "")}
                  id={blog._id}
                  tags={tags}
                  thumbnail={blog.thumbnail}
                  title={blog.title}
                  numberOfVisits={0}
                  showStatistics={true}
                  isAdmin={true}
                />
              </Grid>
            );
          })}
        </Grid>
      </NoInformationToDisplay>
    </Wrapper>
  );
};

export default Blogs;
