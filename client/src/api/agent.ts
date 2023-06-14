import axios, { AxiosResponse } from "axios";
import getUserToken from "helpers/getUserToken";
import { BlogData } from "pages/BlogPage/models";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (err) {
    console.log(err);
    return await Promise.reject(err);
  }
});

axios.interceptors.request.use((config) => {
  const token = getUserToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const BlogAndResource = {
  list: (skipItemNumber?: number) =>
    requests.get<BlogData[] | undefined>(
      skipItemNumber
        ? `/api/blog-and-resource/numbered-recent-blogs/${skipItemNumber}`
        : "/api/blog-and-resource"
    ),
  listSingle: (blogTitle: string) =>
    requests.get<BlogData | undefined>(`/api/blog-and-resource/${blogTitle}`),
};

const agent = {
  BlogAndResource,
};

export default agent;
