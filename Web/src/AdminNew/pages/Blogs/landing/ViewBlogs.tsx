import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import { blogs } from "data/blogs";
import { formatISODateOnly } from "helpers/dateFormatter";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import "./ViewBlog.scss";
import { FaEdit, FaPen, FaTrash, FaTrashAlt } from "react-icons/fa";
import ENDPOINTS from "constants/endpoints";
import { BlogType } from "../Blogs";
import webinars from "data/webinars";
import getUserToken from "helpers/getUserToken";
import axios from "axios";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "View Blog",
    url: paths.adminViewBlogs,
    isActive: true,
  },
];

const ViewBlogs: React.FC = () => {
  const params = useParams();
  const blogId = params.id;
  const [blog, setBlog] = useState<BlogType>({
    _id: "",
    thumbnail: "",
    title: "",
    tags: [],
    content: "",
    author: "",
    createdAt: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  useEffect(() => {
    const getBlog = async () => {
      const request = await fetch(
        ENDPOINTS.BLOGS_SINGLE.replace(":blogId", blogId ?? "")
      );
      const response = await request.json();

      setBlog(response);
      setLoading(false);
    };
    getBlog();
  }, [blog, blogId]);

  const navigate = useNavigate();
  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Blogs",
      url: paths.blogs,
      isActive: false,
    },
    {
      title: blog.title || "",
      url: paths.blogsSingle,
      isActive: true,
    },
  ];
  //deletet blog function
  const deleteBlog = () => {
    const config = {
      Authorization: "Bearer " + getUserToken(),
    };
    const endpoint = ENDPOINTS.BLOGS_SINGLE.replace(":blogId", blogId ?? "");
    setActionLoading(true);
    axios
      .delete(endpoint, { headers: config })
      .then((response) => {
        setActionLoading(false);
        navigate(paths.adminBlogs);
      })
      .catch((error) => {
        console.log(error);
        setActionLoading(false);
      });
  };
  return (
    <Wrapper
      className="webinar-admin-container"
      loading={loading || actionLoading}
      error={false}
      breadcrumb={breadcrumb}
    >
      <div className="webinar-content">
        <div className="webinar-content-header">
          <h2>{blog.title}</h2>
          <div className="webinar-actions">
            <button
              onClick={() =>
                navigate(paths.adminBlogForm.replace(":id", blogId ?? ""))
              }
            >
              <FaEdit />
            </button>
            <button onClick={() => setActionDialog(true)}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Thumbnail</h3>
          <div className="blog-thumbnail-container">
            <img src={blog.thumbnail} alt={blog.thumbnail} />
          </div>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Title</h3>
          {ReactHtmlParser(blog?.title ?? "")}
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Content</h3>
          {ReactHtmlParser(blog?.content ?? "")}
        </div>
      </div>

      <Dialog open={actionDialog} onClose={() => setActionDialog(false)}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to delete {blog.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setActionDialog(false)}
            style={{ fontSize: "13px" }}
          >
            No
          </Button>
          <Button
            onClick={() => deleteBlog()}
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to delete this blog.
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ViewBlogs;
