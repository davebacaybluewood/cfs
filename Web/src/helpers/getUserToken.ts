const getUserToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  const authToken = userInfo.token;

  return authToken;
};

export default getUserToken;
