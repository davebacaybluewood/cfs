import { blogsDummy } from "constants/dummyDatas";
import { paths } from "constants/routes";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";

const BlogSingle = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const blog = blogsDummy.find((data) => data.blogId === blogId);

  useEffect(() => {
    if (!blog) {
      navigate(paths.invalid);
    }
  });
  return (
    <div>
      <div className="blog-title">{blog?.title}</div>
      <div>{ReactHtmlParser(blog?.description ?? "")}</div>
    </div>
  );
};

export default BlogSingle;
