const userInfoConfig = (getState: any) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  return config;
};

export default userInfoConfig;
