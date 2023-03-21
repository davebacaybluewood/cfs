import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  BLOGS: "/",
  BLOGS_SINGLE: "/:blogId",
};

const parentUrl = "/api/blogs";

let blogEndpoints: Record<keyof typeof endpoints, string> = endpointConnector(
  endpoints,
  parentUrl
);

export default blogEndpoints;
