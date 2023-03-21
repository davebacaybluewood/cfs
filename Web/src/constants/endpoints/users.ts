import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  CHECK_EMAIL: "email-check/account",
  CHANGE_PASSWORD: "change-password/account",
  USER_LOGIN: "login",
  USER_ADMIN_LIST: "",
  USER_ADMIN_BY_ID: ":id",
  ADMIN_PROFILE: "profile",
};

const parentUrl = "/api/users/";

let usersEndpoints: Record<keyof typeof endpoints, string> = endpointConnector(
  endpoints,
  parentUrl
);

export default usersEndpoints;
