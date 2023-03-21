import endpointConnector from "helpers/endpointConnector";

const endpoints = {
  CONTACTS: "/",
};

const parentUrl = "/api/contacts";

let contactEndpoints: Record<keyof typeof endpoints, string> =
  endpointConnector(endpoints, parentUrl);

export default contactEndpoints;
