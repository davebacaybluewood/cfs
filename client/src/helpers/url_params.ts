const url_params = new Proxy(
  new URLSearchParams(window.location.search) as any,
  {
    get: (searchParams, prop) => searchParams.get(prop?.toString()),
  }
);

export default url_params;
