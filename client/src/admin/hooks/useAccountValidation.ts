import { paths } from "constants/routes";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAccountValidation = () => {
  const [account, setAccount] = useState();
  const navigate = useNavigate();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate(paths.login);
    } else {
      setAccount(userInfo);
    }
  }, [userInfo]);

  return account;
};

export default useAccountValidation;
