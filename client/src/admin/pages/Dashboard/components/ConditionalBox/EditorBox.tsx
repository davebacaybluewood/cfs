import { Grid, Paper } from "@mui/material";
import { paths } from "constants/routes";
import React from "react";
import { FaRegNewspaper, FaNewspaper } from "react-icons/fa";
import DashboardCard from "../DashboardCard/DashboardCard";
import { StatisticTypes } from "../../types";
import Box from "admin/components/Box/Box";
import Title from "admin/components/Title/Title";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
// import BlogCard from "library/BlogCard/BlogCard";
import { ChipTypes } from "admin/pages/Blogs/types";
import Spinner from "admin/components/Spinner/Spinner";
import BlogCard from "library/Blogs/BlogCard/BlogCard";
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource";

const EditorBox = () => {
  const { blogs, loading } = useFetchBlogResource();

  const statistics: StatisticTypes[] = [
    {
      countText: "All Blogs",
      count: blogs?.length ?? 0,
      url: paths.login,
      icon: <FaRegNewspaper />,
    },
    {
      countText: "Published Blogs",
      count: 2,
      url: paths.login,
      icon: <FaNewspaper />,
    },
    {
      countText: "Draft Blogs",
      count: 2,
      url: paths.login,
      icon: <FaRegNewspaper />,
    },
    {
      countText: "Declined Blogs",
      count: 2,
      url: paths.login,
      icon: <FaNewspaper />,
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={2} marginBottom={2}>
        {statistics.map((statistic: StatisticTypes, index: number) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
            <DashboardCard {...statistic} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item sm={12} md={12} lg={12}>
          <Box>
            <Paper>
              {/* <Calendar /> */}
              <Title
                title="Blogs"
                subtitle="List of 5 blogs"
                link={paths.webinar}
              />

              {loading ? (
                <Spinner />
              ) : (
                <NoInformationToDisplay
                  showNoInfo={false}
                  message="No webinars available."
                  title="No Information to display."
                >
                  <Grid container spacing={2}>
                    {blogs?.map((data) => {
                      return (
                        <Grid item sm={12} md={6} lg={2}>
                          <BlogCard
                            author={{
                              authorName: data.authorName ?? "",
                              image: data.authorThumbnail ?? "",
                            }}
                            blogId={data._id}
                            date={data.createdAt ?? ""}
                            description={data.content}
                            image={data.thumbnail}
                            title={data.title}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </NoInformationToDisplay>
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EditorBox;
