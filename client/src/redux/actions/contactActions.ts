import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { CONTACT_ACTION_TYPES } from "constants/redux-constants";
import errorMessage from "./helpers/errorMessage";
import userInfoConfig from "./helpers/userInfoConfig";

export const listContacts = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: CONTACT_ACTION_TYPES.CONTACT_ACTION_TYPES_REQUEST,
    });

    const { data } = await axios.get(
      ENDPOINTS.CONTACTS,
      userInfoConfig(getState)
    );

    dispatch({
      type: CONTACT_ACTION_TYPES.CONTACT_ACTION_TYPES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: CONTACT_ACTION_TYPES.CONTACT_ACTION_TYPES_FAIL,
      payload: errorMessage(error),
    });
  }
};
