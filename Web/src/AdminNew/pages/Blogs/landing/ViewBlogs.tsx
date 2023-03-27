import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
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
import { toast } from "react-toastify";

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

  const deleteBlog = () => {
    setActionLoading(true);
    const config = {
      Authorization: "Bearer " + getUserToken(),
    };
    const endpoint = ENDPOINTS.BLOGS_SINGLE.replace(":blogId", blogId ?? "");
    axios
      .delete(endpoint, { headers: config })
      .then((response) => {
        setActionLoading(false);
        toast.info(`Blog Deleted`, {
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
      })
      .catch((error) => {
        console.log(error);
        setActionLoading(false);
      });
  };
  const tagLists = blog[0]?.tags?.map((tag: any) => {
    return {
      description: tag.label,
      link: "/",
    };
  });
  const metaTagLists = blog[0]?.metaTagKeywords?.map((metaTag: any) => {
    return {
      description: metaTag.keyword,
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
              onClick={() => visitBlogHandler(blog[0]?._id!)}
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
        <div className="blog-html">
          <h3 className="blog-label">Meta Tag Title</h3>
          <p className="blog-title">
            {ReactHtmlParser(blog[0]?.metaTagTitle ?? "")}
          </p>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Meta Tag Description</h3>
          <p className="blog-title">
            {ReactHtmlParser(blog[0]?.metaTagDescription ?? "")}
          </p>
        </div>
        <div className="blog-html">
          <h3 className="blog-label">Meta Tag Keywords</h3>
          <Chip tags={metaTagLists ?? []}></Chip>
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
