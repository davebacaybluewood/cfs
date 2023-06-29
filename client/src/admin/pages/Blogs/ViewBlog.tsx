import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button as MUIButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import useScroll from "hooks/useScroll";
import { BlogData } from "pages/BlogPage/models";
import agent from "api/agent";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./ViewBlog.scss";
import { toast } from "react-toastify";

const ViewBlog: React.FC = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { blogTitle: blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogData | undefined>();

  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      const data = await agent.BlogAndResource.listSingleById(blogId ?? "");
      setBlog(data);
      setLoading(false);
    };
    fetchSingleData();
  }, [blogId]);

  const navigate = useNavigate();
  useScroll();

  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Blogs",
      url: paths.adminBlogs,
      isActive: false,
    },
    {
      title: blog?.title || "",
      url: paths.adminBlogs,
      isActive: true,
    },
  ];

  const deleteBlog = () => {
    agent.BlogAndResource.delete(blog?._id ?? "");
    toast.info(`Blog has been deleted`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(paths.adminBlogs);
  };

  return (
    <Wrapper
      className="blog-admin-container"
      loading={loading || actionLoading}
      error={false}
      breadcrumb={breadcrumb}
    >
      <div className="viewBlog-content">
        <div className="viewBlog-content-header">
          <h2>{blog?.title}</h2>
          <div className="viewBlog-actions">
            <button
              title="Edit Blog"
              onClick={() =>
                navigate(paths.adminBlogForm.replace(":id", blog?._id ?? ""))
              }
            >
              <FaEdit />
            </button>
            <button onClick={() => setActionDialog(true)}>
              <FaTrashAlt title="Delete Blog" />
            </button>
          </div>
        </div>
        <div className="viewBlog-html">
          <h3 className="viewBlog-label">
            <div className="blog-thumbnail-label">Blog Thumbnail </div>
            <MUIButton
              variant="contained"
              onClick={() => {
                setThumbnail(blog?.thumbnail ?? "");
                setOpenModal(true);
              }}
            >
              View Thumbnail
            </MUIButton>
          </h3>
          {ReactHtmlParser(blog?.content ?? "")}
        </div>
      </div>
      <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <img className="embed-responsive-item-admin" src={thumbnail} />
      </Dialog>
      <Dialog open={actionDialog} onClose={() => setActionDialog(false)}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to delete {blog?.title}?
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

export default ViewBlog;
