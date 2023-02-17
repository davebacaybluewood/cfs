import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [data, setData] = useState({
    loading: false,
    error: null,
    user: {},
  });

  useEffect(() => {
    setData({ loading: true, error: null, user: {} });
    fetch(ENDPOINTS.ADMIN_PROFILE, {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData({ loading: false, error: null, user: data });
      })
      .catch((error) => {
        setData({ loading: false, error, user: {} });
      });
  }, []);

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
