import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { INQUIRY_ACTION_TYPES } from "constants/redux-constants";

export const listInquiries = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: INQUIRY_ACTION_TYPES.INQUIRY_ACTION_TYPES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(ENDPOINTS.INQUIRIES, config);
    dispatch({
      type: INQUIRY_ACTION_TYPES.INQUIRY_ACTION_TYPES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: INQUIRY_ACTION_TYPES.INQUIRY_ACTION_TYPES_FAIL,
      payload:
        error?.response! && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const submitInquiry =
  (
    fullName: string,
    mobileNumber: string,
    emailAddress: string,
    subject: string,
    message: string,
    inquiryType: string
  ) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: INQUIRY_ACTION_TYPES.INQUIRY_ACTION_SUBMIT_TYPES_REQUEST,
      });

      const { data } = await axios.post(ENDPOINTS.INQUIRIES_SUBMIT, {
        fullName,
        mobileNumber,
        emailAddress,
        subject,
        message,
        inquiryType,
      });

      dispatch({
        type: INQUIRY_ACTION_TYPES.INQUIRY_ACTION_SUBMIT_TYPES_SUCCESS,
        payload: data,
      });

      console.log("test1");
    } catch (error: any) {
      dispatch({
        type: INQUIRY_ACTION_TYPES.INQUIRY_ACTION_SUBMIT_TYPES_FAIL,
        payload:
          error?.response! && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
