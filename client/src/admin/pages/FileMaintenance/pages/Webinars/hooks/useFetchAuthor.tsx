import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { useState, useEffect } from "react";

export type AuthorValueType = {
  _id: string;
};

const useFetchAuthor = (id?: string) => {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (id?.toString()) {
      const endpoint = ENDPOINTS.AGENT_BY_ID.replace(":id", id);
      axios
        .get(endpoint)
        .then((response) => {
          setAuthor(response.data); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return {
    author,
  };
};

export default useFetchAuthor;
