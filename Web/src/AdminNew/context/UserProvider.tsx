import { AgentData } from "AdminNew/pages/Agents/hooks/useFetchAgent";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import React, { createContext, useEffect, useState } from "react";

type UserContextData = {
  loading: boolean;
  error: boolean | null;
  user: AgentData | undefined;
};
export const UserContext = createContext<UserContextData>({
  error: false,
  loading: false,
  user: undefined,
});

const UserProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [data, setData] = useState({
    loading: false,
    error: null,
    user: undefined,
  });
  const localData = localStorage.getItem("userInfo");
  useEffect(() => {
    setData({ loading: true, error: null, user: undefined });

    setData({
      loading: false,
      error: null,
      user: JSON.parse(localData as any),
    });
  }, [localData]);

  return (
    <UserContext.Provider
      value={{ loading: data.loading, error: data.error, user: data.user }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
