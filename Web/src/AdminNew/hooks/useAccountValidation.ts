import paths from "constants/routes";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAccountValidation = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate(paths.login);
    }
  }, [userInfo]);
};

export default useAccountValidation;
