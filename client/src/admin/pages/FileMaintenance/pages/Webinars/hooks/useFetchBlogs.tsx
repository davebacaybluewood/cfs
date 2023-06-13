import { ChipTypes, MetaTagKeywordsTypes } from "admin/pages/Blogs/types";
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
  thumbnailAlt?: string;
};

const useFetchBlogs = (title?: string) => {
  const [blogs, setBlogs] = useState<BlogValueType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title?.toString() !== "add") {
      setLoading(true);
      const endpoint = title
        ? ENDPOINTS.BLOGS_SINGLE_FETCH_BY_TITLE.replace(":blogTitle", title)
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

    return () => setBlogs([]);
  }, [title]);

  return {
    blogs,
    loading,
  };
};

export default useFetchBlogs;
