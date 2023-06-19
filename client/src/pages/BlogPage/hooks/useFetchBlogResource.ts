import agent from "api/agent";
import { useEffect, useState } from "react";
import { BlogDataWithLength } from "../models";

const useFetchBlogResource = (skipItemNumber?: number, limit?: number) => {
  const [blogsData, setBlogsData] = useState<BlogDataWithLength | undefined>();
  const [loading, setLoading] = useState(false);

  const modifiedSkipItemNumber = skipItemNumber ?? 0;
  const modifiedLimit = limit ?? 50;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await agent.BlogAndResource.list(
        modifiedSkipItemNumber,
        modifiedLimit ? modifiedLimit : 50
      );
      setBlogsData(data);
      setLoading(false);
    };
    fetchData();
  }, [modifiedLimit, modifiedSkipItemNumber]);

  return {
    blogs: blogsData?.blogs,
    blogTotalLength: blogsData?.blogLength ?? 0,
    loading,
  };
};

export default useFetchBlogResource;
