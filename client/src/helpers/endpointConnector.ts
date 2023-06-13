const endpointConnector = (endpoints: any, concatinatedString: string) => {
  for (let k in endpoints) {
    if (endpoints.hasOwnProperty(k)) {
      endpoints[k] = concatinatedString + endpoints[k];
    }
  }

  return endpoints;
};

export default endpointConnector;
