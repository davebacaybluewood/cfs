import axios, { AxiosResponse } from "axios";
import getUserToken from "helpers/getUserToken";
import {
  BlogData,
  BlogDataWithLength,
  BlogPayload,
} from "pages/BlogPage/models";
import { SubscriptionsData } from "./models/Subscriptions";
import { SubscriberRegisterData } from "./models/Subscriber";
import { DefaultResSuccess } from "./models/Defaults";

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

const Subscription = {
  create: async (emailAddress: string) => {
    const res = await requests.post<any>(`/api/subscriptions/`, {
      emailAddress,
    });
    return res;
  },
  get: async () => {
    axios.interceptors.request.use((config) => {
      const token = getUserToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    const res = await requests.get<SubscriptionsData[] | undefined>(
      `/api/subscriptions/`
    );

    return res;
  },
  delete: async (id: string) => {
    axios.interceptors.request.use((config) => {
      const token = getUserToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    const res = await requests.del<any>(`/api/subscriptions/${id}`);

    return res;
  },
};

const Inquiry = {
  submit: async (
    emailAddress: string,
    phoneNumber: string,
    state: string,
    fullName: string,
    message: string
  ) => {
    const res = await requests.post<any>(`/api/inquiries/`, {
      emailAddress,
      fullName,
      phoneNumber,
      message,
      state,
    });
    return res;
  },
};

const Subscriber = {
  emailConfirmation: async (
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    phoneNumber: string,
    userGuid: string
  ) => {
    const endpoint = "/api/subscriber/subscribe-email";

    try {
      const res = await requests.post<SubscriberRegisterData>(endpoint, {
        email,
        password,
        lastName,
        firstName,
        phoneNumber,
        userGuid,
      });

      return res;
    } catch (error) {
      return false;
    }
  },

  subscriberRegistration: async (
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    phoneNumber: string,
    verificationCode: string,
    userGuid: string
  ) => {
    const endpoint = "/api/subscriber/subscribe-code";

    try {
      const res = await requests.post<SubscriberRegisterData>(endpoint, {
        email,
        password,
        lastName,
        firstName,
        phoneNumber,
        verificationCode,
        userGuid,
      });

      return res;
    } catch (error) {
      return false;
    }
  },
};

const RSVP = {
  submitRSVP: async (
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    remarks: string,
    eventId: string,
    recruiterUserGuid?: string | undefined
  ) => {
    const endpoint = `/api/rsvp-event/${eventId}`;

    try {
      const res = await requests
        .post<DefaultResSuccess>(endpoint, {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          remarks,
          recruiterUserGuid,
        })
        .catch((err) => {
          let api_res = {
            message: err.response?.data?.description ?? "Something went wrong",
            status: "error",
          };

          return api_res;
        });

      return res;
    } catch (error) {
      return false;
    }
  },
};

const Mission = {
  createMissionAgent: async (
    emailAddress: string,
    state: string,
    zipCode: string,
    birthDate: Date,
    profileImage: string
  ) => {
    axios.interceptors.request.use((config) => {
      const token = getUserToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "multipart/form-data";
      }
      return config;
    });

    const endpoint = `/api/events/mission/registration`;
    const res = await requests.post(endpoint, {
      emailAddress,
      state,
      zipCode,
      birthDate,
      profileImage,
    });
    return res;
  },
  claimReward: async (rewardId: string, data) => {
    const endpoint = `/api/event-orders/claim-reward/${rewardId}`;
    const { userGuid, addressLine1, addressLine2, state, zipCode, notes } =
      data;

    const res = await requests
      .post<DefaultResSuccess>(endpoint, {
        userGuid,
        addressLine1,
        addressLine2,
        state,
        zipCode,
        notes,
      })
      .catch((err) => {
        let api_res = {
          message: err.response?.data?.description ?? "Something went wrong",
          status: "error",
        };

        return api_res;
      });

    return res;
  },
};

const agent = {
  BlogAndResource,
  Subscription,
  Inquiry,
  Subscriber,
  RSVP,
  Mission,
};

export default agent;
