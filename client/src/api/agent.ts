import axios, { AxiosResponse } from "axios";
import getUserToken from "helpers/getUserToken";
import {
  BlogData,
  BlogDataWithLength,
  BlogPayload,
} from "pages/BlogPage/models";

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
  list: (skipItemNumber?: number, limit?: number) =>
    requests.get<BlogDataWithLength | undefined>(
      `/api/blog-and-resource/numbered-recent-blogs/${skipItemNumber}/${
        limit ? limit : 100
      }`
    ),
  listSingle: (blogTitle: string) =>
    requests.get<BlogData | undefined>(
      `/api/blog-and-resource/${blogTitle}/title`
    ),
  listSingleById: (blogId: string) =>
    requests.get<BlogData | undefined>(`/api/blog-and-resource/${blogId}`),
  search: (keyword: string) =>
    requests.post<BlogDataWithLength | undefined>(
      "/api/blog-and-resource/search",
      {
        title: keyword,
      }
    ),

  create: async (values: BlogPayload) => {
    axios.interceptors.request.use((config) => {
      const token = getUserToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "multipart/form-data";
      }
      return config;
    });

    values.tags = values.tags?.map((data: any) => data.value);
    values.metaTagKeywords = values.metaTagKeywords?.map(
      (data: any) => data.value
    );
    const res = await requests.post<any>(`/api/blog-and-resource/`, values);

    if (res?.userGuid) {
      return true;
    } else {
      return false;
    }
  },
  update: async (values: BlogPayload) => {
    axios.interceptors.request.use((config) => {
      const token = getUserToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "multipart/form-data";
      }
      return config;
    });

    values.tags = values.tags?.map((data: any) => {
      return {
        label: data.value,
      };
    }) as any;
    values.metaTagKeywords = values.metaTagKeywords?.map((data: any) => {
      return {
        keyword: data.value,
      };
    }) as any;
    const res = await requests.put<any>(
      `/api/blog-and-resource/${values._id}`,
      values
    );

    if (res?.userGuid) {
      return true;
    } else {
      return false;
    }
  },
  delete: async (id: string) => {
    const res = await requests.del<any>(`/api/blog-and-resource/${id}`);

    if (res) {
      return true;
    } else {
      return false;
    }
  },
};

const agent = {
  BlogAndResource,
};

export default agent;
