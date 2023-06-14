import agent from "api/agent";
import { useEffect, useState } from "react";
import { BlogData } from "../models";

const useFetchBlogResource = (skipItemNumber?: number) => {
  const [blogs, setBlogs] = useState<BlogData[] | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await agent.BlogAndResource.list(skipItemNumber);
      setBlogs(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    blogs,
    loading,
  };
};

export default useFetchBlogResource;
