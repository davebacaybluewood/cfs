import {
  USER_ADD_ACTION_TYPES,
  USER_DELETE_ACTION_TYPES,
  USER_LIST_ACTION_TYPES,
  USER_LOGIN_ACTION_TYPES,
} from "constants/redux-constants";

export const userLoginReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case USER_LOGIN_ACTION_TYPES.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_ACTION_TYPES.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_ACTION_TYPES.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_ACTION_TYPES.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state: any = { users: [] }, action: any) => {
  switch (action.type) {
    case USER_LIST_ACTION_TYPES.USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_ACTION_TYPES.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_ACTION_TYPES.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userDeleteReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case USER_DELETE_ACTION_TYPES.USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_ACTION_TYPES.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_ACTION_TYPES.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_ADD_ACTION_TYPES.USER_ADD_REQUEST:
      return { loading: true };
    case USER_ADD_ACTION_TYPES.USER_ADD_SUCCESS:
      return { loading: false, success: true };
    case USER_ADD_ACTION_TYPES.USER_ADD_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADD_ACTION_TYPES.USER_ADD_RESET:
      return { state: {} };
    default:
      return state;
  }
};
