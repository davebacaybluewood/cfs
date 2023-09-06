const getUserToken = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo")!);
  const authToken = userInfo?.token;

  return authToken;
};

export default getUserToken;
