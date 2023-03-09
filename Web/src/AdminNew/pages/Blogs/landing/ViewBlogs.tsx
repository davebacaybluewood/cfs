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
import useFetchBlogs from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs";

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

  const [actionLoading, setActionLoading] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { blogs: blog, loading } = useFetchBlogs(blogId);

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
  const visitBlogHandler = (id:string) => {
    navigate(paths.blogsSingle.replace(":id", id))
  }
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
      <div className="blog-content">
        <div className="blog-content-header">
          <h2>{blog.title}</h2>
          <div className="blog-actions">
            <button className="blog-visit-btn" onClick={() => visitBlogHandler(blog._id)}>Visit Blog</button>
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
            <Button
              variant="contained"
              onClick={() => {
                setThumbnail(blog.thumbnail);
                setOpenModal(true);
              }}
            >
              View Thumbnail
            </Button>
          </div>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Title</h3>
          <p className="blog-title">{ReactHtmlParser(blog?.title ?? "")}</p>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Content</h3>
          {ReactHtmlParser(blog?.content ?? "")}
        </div>
      </div>

      <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <img src={thumbnail} alt={thumbnail} />
      </Dialog>
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
