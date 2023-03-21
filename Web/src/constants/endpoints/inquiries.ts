import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  INQUIRIES: "/",
  INQUIRIES_SUBMIT: "/",
};

const parentUrl = "/api/inquiries";

let inquiriesEndpoints: Record<keyof typeof endpoints, string> =
  endpointConnector(endpoints, parentUrl);

export default inquiriesEndpoints;
