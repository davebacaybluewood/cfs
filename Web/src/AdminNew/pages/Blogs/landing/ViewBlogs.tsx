import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import "./ViewBlog.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import axios from "axios";
import useFetchBlogs from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs";
import Chip from "pages/Blogs/components/Chip/Chip";

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
      title: blog[0]?.title || "",
      url: paths.blogsSingle,
      isActive: true,
    },
  ];
  const visitBlogHandler = (id: string) => {
    navigate(paths.blogsSingle.replace(":id", id));
  };
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
  //tags
  const tagLists = blog[0]?.tags?.map((tag: any) => {
    return {
      description: tag.label,
      link: "/",
    };
  });
  return (
    <Wrapper
      className="webinar-admin-container"
      loading={loading || actionLoading}
      error={false}
      breadcrumb={breadcrumb}
    >
      <div className="blog-content">
        <div className="blog-content-header">
          <h2>{blog[0]?.title}</h2>
          <div className="blog-actions">
            <button
              className="blog-visit-btn"
              onClick={() => visitBlogHandler(blog[0]?._id)}
            >
              Visit Blog
            </button>
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
                setThumbnail(blog[0]?.thumbnail);
                setOpenModal(true);
              }}
            >
              View Thumbnail
            </Button>
          </div>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Title</h3>
          <p className="blog-title">{ReactHtmlParser(blog[0]?.title ?? "")}</p>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Tags</h3>
          <Chip tags={tagLists ?? []}></Chip>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Blog Content</h3>
          {ReactHtmlParser(blog[0]?.content ?? "")}
        </div>
      </div>

      <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <img src={thumbnail} alt={thumbnail} />
      </Dialog>
      <Dialog open={actionDialog} onClose={() => setActionDialog(false)}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to delete {blog[0]?.title}?
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
