import React from "react";
import { useParams } from "react-router-dom";

const SingleBlog: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  return <div>SingleBlog</div>;
};

export default SingleBlog;
