import { ChipTypes, MetaTagKeywordsTypes } from "AdminNew/pages/Blogs/types";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { useState, useEffect } from "react";

export type BlogValueType = {
  _id?: string;
  metaTagTitle: string;
  metaTagDescription: string;
  metaTagKeywords: MetaTagKeywordsTypes[];
  thumbnail: string;
  title: string;
  tags: ChipTypes[];
  content?: string;
  author: string;
  authorName?: string;
  singleAuthorName?: string;
  createdAt?: Date;
  dateCreated?: Date;
};

const useFetchBlogs = (id?: string) => {
  const [blogs, setBlogs] = useState<BlogValueType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id?.toString() !== "add") {
      setLoading(true);
      const endpoint = id
        ? ENDPOINTS.BLOGS_SINGLE.replace(":blogId", id)
        : ENDPOINTS.BLOGS;
      axios
        .get(endpoint)
        .then((response) => {
          setBlogs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [id]);

  return {
    blogs,
    loading,
  };
};

export default useFetchBlogs;
