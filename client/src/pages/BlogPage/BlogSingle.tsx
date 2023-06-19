import { blogsDummy } from "constants/dummyDatas";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";

const BlogSingle = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const blog = blogsDummy.find((data) => data.blogId === blogId);

  return (
    <div>
      <div className="blog-title">{blog?.title}</div>
      <div>{ReactHtmlParser(blog?.description ?? "")}</div>
    </div>
  );
};

export default BlogSingle;
