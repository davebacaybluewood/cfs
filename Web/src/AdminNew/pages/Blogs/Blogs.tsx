import { Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import BlogCard from "library/BlogCard/BlogCard";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CrumbTypes } from "../Dashboard/types";
import "./Blogs.scss";

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

export type ChipTypes = {
  _id: string;
  label: string;
};

export type BlogType = {
  _id: string;
  thumbnail: string;
  title: string;
  tags: ChipTypes[];
  content?: string;
  author: string;
  createdAt?: Date;
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [users, setUsers] = useState([]);
  const [authorId, setAuthorId] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getBlogs = async () => {
      const request = await fetch(ENDPOINTS.BLOGS);
      const response = await request.json();
      setBlogs(response);
      setAuthorId(response.author);
      setLoading(false);
    };

    getBlogs();
  }, [blogs]);

  const navigate = useNavigate();

  const addBlogHandler = () => {
    navigate(paths.adminBlogForm.replace(":id", "add"));
  };
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Title subtitle="View All Blogs" title="Blogs"></Title>
      <div className="add-blogs">
        <button onClick={addBlogHandler}>
          <FaPlus />
        </button>
      </div>

      <Grid container marginBottom={3}>
        {blogs?.map((blog) => {
          const tags = blog.tags.map((tag) => {
            return {
              description: tag.label,
              link: "/",
            };
          });
          return (
            <Grid item xs={12} sm={6} md={2} lg={2} className="admin-blog-grid">
              <BlogCard
                author={blog.author}
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
    </Wrapper>
  );
};

export default Blogs;
