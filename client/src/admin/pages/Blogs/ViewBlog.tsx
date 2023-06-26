import React, { useEffect, useState } from "react";
import { Dialog, Button as MUIButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import useScroll from "hooks/useScroll";
import { BlogData } from "pages/BlogPage/models";
import agent from "api/agent";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./ViewBlog.scss";

const ViewBlog: React.FC = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { blogTitle } = useParams();
  const originalTitle = blogTitle?.split("-").join(" ").toLowerCase();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogData | undefined>();

  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      const data = await agent.BlogAndResource.listSingle(originalTitle ?? "");
      setBlog(data);
      setLoading(false);
    };
    fetchSingleData();
  }, [blogTitle]);

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
              onClick={() => navigate(paths.adminEditBlogs)}
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
        <img className="embed-responsive-item-admin" src={thumbnail}></img>
      </Dialog>
    </Wrapper>
  );
};

export default ViewBlog;
