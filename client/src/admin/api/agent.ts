import axios, { AxiosResponse } from "axios";
import { LandingPageData } from "admin/models/landingPageModels";
import getUserToken from "helpers/getUserToken";
import { RegisteredUserData } from "admin/pages/LandingPage/LandingPageInfo";
import { AgentData } from "admin/models/agentModels";
import { ContractingData } from "admin/models/contractingModel";

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

const LandingPage = {
  list: () => requests.get<LandingPageData[] | undefined>("/api/landing-page"),
  listDetail: (pageId: string) =>
    requests.get<LandingPageData | undefined>(`/api/landing-page/${pageId}`),
};

const LandingPageRegisteredUsers = {
  listAllRegisteredUsers: () =>
    requests.get<RegisteredUserData[] | undefined>(
      `/api/landing-page-registered-users/`
    ),
  list: (pageId: string) =>
    requests.get<RegisteredUserData[] | undefined>(
      `/api/landing-page-registered-users/${pageId}`
    ),
  activate: (pageId: string, userGuid: string) => {
    requests.post(
      `/api/landing-page-registered-users/${userGuid}/${pageId}/activate`,
      {}
    );
  },
  deactivate: (pageId: string, userGuid: string) => {
    requests.post(
      `/api/landing-page-registered-users/${userGuid}/${pageId}/deactivate`,
      {}
    );
  },
};

const Agents = {
  agentInformation: (userGuid: string) =>
    requests.get<AgentData | undefined>(`/api/agents/${userGuid}`),
};

const Contracting = {
  requestContract: (body: ContractingData) =>
    requests.post<string>("/api/contracting/", body),
};

const agent = {
  LandingPage,
  LandingPageRegisteredUsers,
  Agents,
  Contracting,
};

export default agent;
