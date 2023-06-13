import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import {
  USER_ADD_ACTION_TYPES,
  USER_DELETE_ACTION_TYPES,
  USER_LIST_ACTION_TYPES,
  USER_LOGIN_ACTION_TYPES,
} from "constants/redux-constants";
import errorMessage from "./helpers/errorMessage";
import headerConfig from "./helpers/headerConfig";
import userInfoConfig from "./helpers/userInfoConfig";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: USER_LOGIN_ACTION_TYPES.USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        ENDPOINTS.USER_LOGIN,
        {
          email,
          password,
        },
        config
      );

      dispatch({
        type: USER_LOGIN_ACTION_TYPES.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_LOGIN_ACTION_TYPES.USER_LOGIN_FAIL,
        payload:
          error?.response! && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGIN_ACTION_TYPES.USER_LOGOUT,
  });
};

export const listAdminAccounts = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_LIST_ACTION_TYPES.USER_LIST_REQUEST,
    });

    const { data } = await axios.get(
      ENDPOINTS.USER_ADMIN_LIST,
      userInfoConfig(getState)
    );
    dispatch({
      type: USER_LIST_ACTION_TYPES.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: USER_LIST_ACTION_TYPES.USER_LIST_FAIL,
      payload: errorMessage(error),
    });
  }
};

export const deleteUser =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: USER_DELETE_ACTION_TYPES.USER_DELETE_REQUEST,
      });

      await axios.delete(
        ENDPOINTS.USER_ADMIN_BY_ID.replace(":id", id),
        userInfoConfig(getState)
      );

      dispatch({
        type: USER_DELETE_ACTION_TYPES.USER_DELETE_SUCCESS,
      });
    } catch (error: any) {
      const message = errorMessage(error);
      dispatch({
        type: USER_DELETE_ACTION_TYPES.USER_DELETE_FAIL,
        payload: message,
      });
    }
  };

export const registerUser =
  (name: string, email: string, password: string) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: USER_ADD_ACTION_TYPES.USER_ADD_REQUEST,
      });

      const { data } = await axios.post(
        ENDPOINTS.USER_ADMIN_LIST,
        { name, email, password },
        userInfoConfig(getState)
      );

      dispatch({
        type: USER_ADD_ACTION_TYPES.USER_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_ACTION_TYPES.USER_ADD_FAIL,
        payload: errorMessage(error),
      });
    }
  };
